const should = require('should')
const test = require('./s1')
const request = require('supertest')(test)

let header
async function getDb() {
		const { MongoClient: MongoDB } = require('mongodb')
		const client = new MongoDB('mongodb://127.0.0.1:27017')
		await client.connect()
		const DB = client.db('test1')
		return { DB, client }
}

describe('GET /register', () => {
		const arrs = ['数据插入成功', '名字已经存在']
		it('数据插入成功 or 名字已经存在 ', (done) => {
				request
						.get('/register?name=76&password=666666')
						.end(async (err, res) => {
								if (err) {
										done(err)
								} else {
										arrs.should.containEql(res.text)
										const db = await getDb()
										const collection = db.DB.collection('user')
										await	collection.deleteOne({ name: '76' })
										db.client.close()
								}
								done()
						})
		})
})

describe('GET /login', () => {
		it('respond Hello XXX', (done) => {
				request
						.get('/login?name=6663366&password=666666')
						.end((err, res) => {
								if (err) {
										done(err)
								} else {
										header = res.header
										res.text.should.equal('Hello 6663366')
								}
								done()
						})
		})
})

describe('GET /start', () => {
		const arrs = ['欢迎来到这里', '请登陆后再尝试其他操作']
		it('start接口测试 ', (done) => {
				request
						.get('/start')
						.set('Cookie', [header['set-cookie'][0].split(';')[0]])
						.end(async (err, res) => {
								if (err) {
										done(err)
								} else {
										arrs.should.containEql(res.text)
										const db = await getDb()
										const collection = db.DB.collection('number')
										const data = await collection.find({}).toArray()
										const userid = { userid: `${data[data.length - 1].userid}` }
										await collection.deleteOne(userid)
										db.client.close()
								}
								done()
						})
		})
})

describe('GET /number', () => {
		const arrs = ['big', 'small', 'equal']
		it('返回 big smell euqal ', (done) => {
				request
						.get('/api/30')
						.set('Cookie', [header['set-cookie'][0].split(';')[0]])
						.end((err, res) => {
								if (err) {
										done(err)
								} else {
										arrs.should.containEql(res.text)
								}
								done()
						})
		})
})

const should = require('should')
const test = require('./apis')
const request = require('supertest')(test)

let header
let cookie
let collection
let DB
let client

async function getDb() {
	const { MongoClient: MongoDB } = require('mongodb')
	client = new MongoDB('mongodb://127.0.0.1:27017')
	await client.connect()
	DB = client.db('test1')
}

describe('GET /register', () => {
	const arrs = ['数据插入成功', '名字已经存在']
	before(async () => {
		await getDb()
		collection = DB.collection('user')
	})
	it('数据插入成功 or 名字已经存在 ', (done) => {
		request
			.get('/register?name=76556&password=666666')
			.end(async (err, res) => {
				if (err) {
					done(err)
				} else {
					arrs.should.containEql(res.text)
				}
				done()
			})
	})
	after(async () => {
		await	collection.deleteOne({ name: '76' })
		client.close()
	})
})

describe('GET /login', () => {
	it('respond Hello XXX', (done) => {
		request
			.get('/login?name=76556&password=666666')
			.end((err, res) => {
				if (err) {
					done(err)
				} else {
					header = res.header
					cookie = [header['set-cookie'][0].split(';')[0]]
					res.text.should.equal('Hello 76556')
				}
				done()
			})
	})
})

describe('GET /start', () => {
	const arrs = ['欢迎来到这里', '请登陆后再尝试其他操作']
	before(async () => {
		await getDb()
		collection = DB.collection('number')
	})
	it('start接口测试 ', (done) => {
		request
			.get('/start')
			.set('Cookie', cookie)
			.end(async (err, res) => {
				if (err) {
					done(err)
				} else {
					arrs.should.containEql(res.text)
				}
				done()
			})
		after(async () => {
			const data = await collection.find({}).toArray()
			const userid = { userid: `${data[data.length - 1].userid}` }
			await collection.deleteOne(userid)
			client.close()
		})
	})
})

describe('GET /number', () => {
	const arrs = ['big', 'small', 'equal']
	it('返回 big smell euqal ', (done) => {
		request
			.get('/api/300')
			.set('Cookie', cookie)
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

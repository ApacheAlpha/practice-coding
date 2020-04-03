const should = require('should')
const test = require('./apis')
const request = require('supertest')(test)
const {
		ensureDB,
} = require('./functions')

let cookie
let collection
let collections

describe('GET /register', () => {
		before(async () => {
				const data = await ensureDB()
				collection = data.db.collection('user')
				collections = data.db.collection('number')
		})

		it('数据插入成功 or 名字已经存在 ', (done) => {
				const arr = ['数据插入成功', '名字已经存在']
				request
						.get('/register?name=76556&password=666666')
						.end((err, res) => {
								if (err) {
										done(err)
								} else {
										arr.should.containEql(res.text)
								}
								done()
						})
		})

		it('respond Hello XXX', (done) => {
				request
						.get('/login?name=76556&password=666666')
						.end((err, res) => {
								if (err) {
										done(err)
								} else {
										cookie = [res.header['set-cookie'][0].split(';')[0]]
										res.text.should.equal('Hello 76556')
								}
								done()
						})
		})

		it('start接口测试 ', (done) => {
				const arr1 = ['欢迎来到这里', '请登陆后再尝试其他操作']
				request
						.get('/start')
						.set('Cookie', cookie)
						.end((err, res) => {
								if (err) {
										done(err)
								} else {
										arr1.should.containEql(res.text)
								}
								done()
						})
		})

		it('返回 big smell euqal ', (done) => {
				const arr2 = ['big', 'small', 'equal']
				request
						.get('/api/300')
						.set('Cookie', cookie)
						.end((err, res) => {
								if (err) {
										done(err)
								} else {
										arr2.should.containEql(res.text)
								}
								done()
						})
		})
		after(async () => {
				const data = await collections.find({}).toArray()
				const userid = { userid: `${data[data.length - 1].userid}` }
				await collection.deleteOne({ name: '76556' })
				await collections.deleteOne(userid)
		})
})

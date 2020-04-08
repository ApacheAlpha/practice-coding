const should = require('should')
const test = require('./apis')
const req = require('request')
const request = require('supertest')(test)
const {
	ensureDB,
} = require('./functions')

describe('GET /register', () => {
	let cookie
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

	it('返回 登出成功 ', (done) => {
		request
			.get('/logout')
			.set('Cookie', cookie)
			.end((err) => {
				if (err) {
					done(err)
				} else {
					req('http://127.0.0.1:3000/start', (error, response) => {
						response.statusCode.should.equal(401)
					})
				}
				done()
			})
	})
	after(async () => {
		const db = await ensureDB()
		const collectionUser = db.collection('user')
		const collectionNumber = db.collection('number')
		const data = await collectionNumber.find({}).toArray()
		const userid = { userid: `${data[data.length - 1].userid}` }
		await collectionUser.deleteOne({ name: '76556' })
		await collectionNumber.deleteOne(userid)
	})
})

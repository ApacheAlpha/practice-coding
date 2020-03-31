const should = require('should')
const test = require('./apis')
const request = require('supertest')(test)

let header

describe('GET /register', () => {
		const arrs = ['数据插入成功', '名字已经存在']
		it('数据插入成功 or 名字已经存在 ', (done) => {
				request
						.get('/register?name=666666&password=666666')
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

describe('GET /login', () => {
		it('respond Hello XXX', (done) => {
				request
						.get('/login?name=666666&password=f16497d3f65406d636ad8e449221e227')
						.end((err, res) => {
								if (err) {
										done(err)
								} else {
										header = res.header
										res.text.should.equal('Hello 666666')
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

describe('GET /delete', () => {
		it('返回 XX条数据被删除 ', () => {
				request
						.get('/ssss/deletes')
		})
})

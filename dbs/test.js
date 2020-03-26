const should = require('should')
const _ = require('lodash')
const test = require('./apiis')
const request = require('supertest')(test)

describe('GET /register', () => {
	const arrs = ['数据插入成功', '名字已经存在']
	it('数据插入成功 or 名字已经存在 ', (done) => {
		request
			.get('/register?name=ree454cd&password=23423')
			.end((err, res) => {
				arrs.should.containEql(res.text)
				done()
			})
	})
})

describe('GET /login', () => {
	it('respond Hello XXX', (done) => {
		request
			.get('/login?name=ree454cd&password=e6f2747d3e12c6c5094870b56211276d')
			.end((err, res) => {
				res.text.should.equal('Hello ree454cd')
				done()
			})
	})
})

describe('GET /start', () => {
	const arrs = ['欢迎再次来到这里', '请登陆后再尝试其他操作']
	it('start接口测试 ', (done) => {
		request
			.get('/start')
			.end((err, res) => {
				console.log(res)
				arrs.should.containEql(res.text)
				done()
			})
	})
})

describe('GET /number', () => {
	const arrs = ['big', 'small', 'equal']
	it('返回 big smell euqal ', (done) => {
		request
			.get('/30')
			.end((err, res) => {
				arrs.should.containEql(res.text)
				done()
			})
	})
})

describe('GET /delete', () => {
	it('返回 XX条数据被删除 ', () => {
		request
			.get('/api/deletes')
	})
})

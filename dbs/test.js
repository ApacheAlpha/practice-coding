const should = require('should')
const _ = require('lodash')
const test = require('./apis')
const req = require('request')
const request = require('supertest')(test)

let header

describe('GET /register', () => {
	const arrs = ['数据插入成功', '名字已经存在']
	it('数据插入成功 or 名字已经存在 ', (done) => {
		request
			.get('/register?name=r777754cd&password=909090')
			.end((err, res) => {
				arrs.should.containEql(res.text)
				done()
			})
	})
})

describe('GET /login', () => {
	it('respond Hello XXX', (done) => {
		request
			.get('/login?name=r777754cd&password=1e96c0d8d4b4bcb50ecccaeffe85ffd5')
			.end((err, res) => {
				header = res.header
				res.text.should.equal('Hello r777754cd')
				done()
			})
	})
})

describe('GET /start', () => {
	const arrs = ['欢迎再次来到这里', '请登陆后再尝试其他操作']
	it('start接口测试 ', (done) => {
		request
			.get('/start')
			.set('Cookie', [header['set-cookie'][0].split(';')[0]])
			.end((err, res) => {
				console.log(res.text)
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
			.set('Cookie', [header['set-cookie'][0].split(';')[0]])
			.end((err, res) => {
				console.log(res.text)
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

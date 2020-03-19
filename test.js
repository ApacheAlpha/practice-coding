const chai = require('chai')
const _ = require('lodash')

// register为例
const test = require('./CRUD')
const request = require('supertest')(test)


describe('GET /register', () => {
	it('数据插入成功 or 名字已经存在 ', () => {
		request
			.get('/register?name=reeeedeeddcd&password=23423')
			.end((err, res) => {
				console.log(res.text)
			})
	})
})

describe('GET /login', () => {
	it('respond hello XXX', () => {
		request
			.get('/login?name=rfcd&password=3456')
			.end((err, res) => {
				if (err) {
					console.log(err)
				}
			})
	})
})


describe('GET /start', () => {
	it('输出数据插入成功 ', () => {
		request
			.get('/start')
			.end((err, res) => {
				console.log(res.text)
			})
	})
})

describe('GET /number', () => {
	it('返回 big smell euqal ', () => {
		request
			.get('/30')
			.end((err, res) => {
				console.log(res.text)
			})
	})
})

describe('GET /delete', () => {
	it('返回 XX条数据被删除 ', () => {
		request
			.get('/delete')
			.end((err, res) => {
				console.log(res.text)
			})
	})
})

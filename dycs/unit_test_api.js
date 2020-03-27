require('should')
const _ = require('lodash')
const requests = require('supertest')
const csz = require('./index')

const request = requests(csz)

describe('GET /start', () => {
	it('respond OK', (done) => {
		request
			.get('/start')
			.end((err, res) => {
				res.text.should.equal('OK')
				done(err)
			})
	})
})


describe('GET /number', () => {
	const num = _.random(0, 100)
	const arrs = ['big', 'small', 'equal']
	it('big or small or equal', (done) => {
		request
			.get(`/${Number(num)}`)
			.end((err, res) => {
				arrs.should.containEql(res.text)
				done(err)
			})
	})
})

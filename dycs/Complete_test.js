const _ = require('lodash')
const req = require('request')

req.get('http://127.0.0.1:3001/start', (err, response, body) => {
	if (!err && response.statusCode === 200) {
		body.should.eql('OK')
	}
})


function compareNumbers(data, min, max) {
	return new Promise((resolve) => {
		req.get(`http://127.0.0.1:3000/${data}`, (err, response, body) => {
			if (!err && response.statusCode === 200) {
				if (body === 'smaller') {
					const nums = _.ceil((data + max) / 2)
					return compareNumbers(nums, data, max)
				} if (body === 'bigger') {
					const nums = _.ceil((data + min) / 2)
					return compareNumbers(nums, min, data)
				} if (body === 'equal') {
					resolve(data)
				}
			}
		})
	})
}

describe('GET /number', () => {
	it('should equal "equal"', (done) => {
		const MIN = 0
		const MAX = 100000
		const num = _.random(0, MAX)
		compareNumbers(num, MIN, MAX)
			.then((data) => {
				data.should.equal('equal')
				done()
			})
			.catch((error) => {
				done(error)
			})
	})
})

const _ = require('lodash')
const req = require('request')

let MIN = 0
let MAX = 100

req.get('http://127.0.0.1:3000/start', (err, response, body) => {
	if (!err && response.statusCode === 200) {
		console.log(body)
	}
})

function test(data) {
	return new Promise((resolve) => {
		req.get(`http://127.0.0.1:3000/${data}`, (err, response, body) => {
			if (!err && response.statusCode === 200) {
				if (body === 'smaller') {
					const nums = _.ceil((data + 100) / 2)
					console.log(nums)
					MIN = data
					MAX = nums
					test(MAX)
				} else if (body === 'bigger') {
					MAX = _.ceil((MIN + MAX) / 2)
					test(MAX)
				} else if (body === 'equal') {
					console.log(data)
					resolve(body)
				}
			}
		})
	})
}

describe('GET /number', () => {
	it('should equal "equal"', () => {
		const num = _.random(0, 100)
		test(num).then((data) => {
			data.should.equal('equal')
		})
	})
})

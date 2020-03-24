const request = require('request')
const _ = require('lodash')

function start(callback) {
	request.get('http://localhost:3000/start',
		(err, response, body) => {
			if (err) {
				callback(err)
			}
			if (!err && response.statusCode === 200) {
				console.log(body)
				callback
			}
		})
}

function comparenumbers(data, min, max, callback) {
	request.get(`http://localhost:3000/${data}`,
		(err, response, body) => {
			if (err) {
				callback(err)
			}
			if (!err && response.statusCode === 200) {
				if (body === 'smaller') {
					const nums = _.ceil((data + max) / 2)
					comparenumbers(nums, data, max)
					callback
				} else if (body === 'bigger') {
					const nums = _.ceil((data + min) / 2)
					comparenumbers(nums, min, data)
					callback
				} else if (body === 'equal') {
					console.log(data)
					callback
				}
				callback
			}
		})
}

const MIN = 0
const MAX = 1000000
const num = _.random(0, MAX)
start()
comparenumbers(num, MIN, MAX)

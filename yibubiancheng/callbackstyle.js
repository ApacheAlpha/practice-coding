const request = require('request')
const _ = require('lodash')

function start(callback) {
	request.get('http://localhost:3000/start',
		(err, response, body) => {
			if (err) {
				callback(err)
			}
			if (!err && response.statusCode === 200) {
				callback(null, body)
			}
		})
}

function CompareNumbers(data, min, max, callback) {
	request.get(`http://localhost:3000/${data}`,
		(err, response, body) => {
			if (err) {
				callback(err)
			}
			if (!err && response.statusCode === 200) {
				if (body === 'smaller') {
					const nums = _.ceil((data + max) / 2)
					CompareNumbers(nums, data, max, callback)
					callback(null, data)
				} else if (body === 'bigger') {
					const nums = _.ceil((data + min) / 2)
					CompareNumbers(nums, min, data, callback)
					callback(null, data)
				} else if (body === 'equal') {
					callback(null, data)
				}
				callback(null, data)
			}
		})
}

function main(err, data) {
	console.log(data)
	return data
}

const MIN = 0
const MAX = 1000000
const num = _.random(0, MAX)
start(main)
CompareNumbers(num, MIN, MAX, main)

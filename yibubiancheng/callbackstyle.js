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
						} else {
								callback(new Error('状态码不等于200'))
						}
				})
}

function compareNumbers(data, min, max, callback) {
		request.get(`http://localhost:3000/${data}`,
				(err, response, body) => {
						if (err) {
								callback(err)
						}
						if (!err && response.statusCode === 200) {
								if (body === 'smaller') {
										const nums = _.ceil((data + max) / 2)
										compareNumbers(nums, data, max, callback)
								} else if (body === 'bigger') {
										const nums = _.ceil((data + min) / 2)
										compareNumbers(nums, min, data, callback)
								} else if (body === 'equal') {
										callback(null, data)
								}
						} else {
								callback(new Error('状态码不等于200'))
						}
				})
}

function main(err, data) {
		if (err) {
				console.log(err)
		}else {
				console.log(data)
		}
}
const MIN = 0
const MAX = 1000000
const num = _.random(0, MAX)
// 串行执行
start((err) => {
		if (err) {
				console.log(err)
		} else {
				compareNumbers(num, MIN, MAX, main)
		}
})

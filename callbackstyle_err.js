const request = require('request')
const _ = require('lodash')

let num
let nums
let min = 0
let max = 1000000

request.get('http://localhost:3000/start',
	(err, response, body) => {
		if (err) throw err
		if (!err && response.statusCode === 200) {
			console.log(body)
		}
	})

function test(data) {
	request.get(`http://localhost:3000/${data}`,
		(err, response, body) => {
			if (err) throw err
			if (!err && response.statusCode === 200) {
				if (err) throw err
				if (body === 'smaller') {
					nums = _.floor((data + 100) / 2)
					min = data
					max = nums
					test(max)
				} else if (body === 'bigger') {
					max = _.ceil((min + max) / 2)
					test(max)
				} else if (body === 'equal') {
					console.log(data)
				}
			}
		})
}

function main(callback) {
	num = _.random(0, 1000000)
	callback(num)
}
main(test)

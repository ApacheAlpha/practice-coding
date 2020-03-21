const request = require('request')
const _ = require('lodash')

let num
let nums
let min = 0
let max = 1000000

function start() {
	return new Promise((resolve, reject) => {
		request.get('http://127.0.0.1:3000/start',
			(err, response, body) => {
				if (err) {
					reject(err)
				}
				if (!err && response.statusCode === 200) {
					resolve(body)
				}
			})
	})
}

function comparenumbers(data) {
	return new Promise((resolve, reject) => {
		request.get(`http://localhost:3000/${data}`,
			(err, response, body) => {
				if (err) {
					reject(err)
				}
				if (!err && response.statusCode === 200) {
					if (body === 'smaller') {
						nums = _.ceil((data + 100) / 2)
						min = data
						max = nums
						comparenumbers(max)
					} else if (body === 'bigger') {
						max = _.ceil((min + max) / 2)
						comparenumbers(max)
					} else if (body === 'equal') {
						resolve(data)
					}
				}
			})
	})
}

function main() {
	num = _.random(0, max)
	start().then((data) => {
		console.log(data)
	})
	comparenumbers(num).then((result) => {
		console.log(result)
	})
}
main()

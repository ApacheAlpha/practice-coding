const request = require('request')
const _ = require('lodash')

let num
let nums
let min = 0
let max = 1000000

function start() {
	return new Promise((resolve, reject) => {
		request.get('http://localhost:3000/start',
			(err, response, body) => {
				if (err) {
					reject(err)
				}
				if (!err && response.statusCode === 200) {
					response.body = body
					resolve(body)
				}
			})
	})
}

function test(data) {
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
						test(max)
					} else if (body === 'bigger') {
						max = _.ceil((min + max) / 2)
						test(max)
					} else if (body === 'equal') {
						console.log(data)
						resolve(data)
					}
				}
			})
	})
}

async function main() {
	try {
		const starts = await start()
		console.log(starts)
		num = _.random(0, 1000000)
		const data = await test(num)
		console.log(data)
	} catch (err) {
		console.error(err)
	}
}

main()

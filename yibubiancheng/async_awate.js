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

function comparenumbers(datas) {
	return new Promise((resolve, reject) => {
		request.get(`http://127.0.0.1:3000/${datas}`,
			(err, response, body) => {
				if (err) {
					reject(err)
				}
				if (!err && response.statusCode === 200) {
					if (body === 'smaller') {
						nums = _.ceil((datas + 100) / 2)
						min = datas
						max = nums
						comparenumbers(max)
					} else if (body === 'bigger') {
						max = _.ceil((min + max) / 2)
						comparenumbers(max)
					} else if (body === 'equal') {
						console.log(datas)
						resolve(datas)
					}
				}
			})
	})
}

async function main() {
	const starts = await start()
	console.log(starts)
	num = _.random(0, max)
	const data = await comparenumbers(num)
	console.log(data)
}
main()

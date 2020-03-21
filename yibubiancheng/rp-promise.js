// request-promise 实现promise风格
const rp = require('request-promise')
const _ = require('lodash')

let num
let nums
let min = 0
let max = 1000000

function start() {
	const options = {
		method: 'GET',
		url: 'http://127.0.0.1:3000/start',
		resolveWithFullResponse: true,
	}
	rp(options)
		.then((response) => {
			console.log(response.body)
		})
		.catch((err) => {
			console.log(err)
		})
}

function test(data) {
	const urls = `http://127.0.0.1:3000/${data}`
	const options1 = {
		method: 'GET',
		url: urls,
		resolveWithFullResponse: true,
	}
	rp(options1)
		.then((response) => {
			if (response.statusCode === 200) {
				if (response.body === 'smaller') {
					nums = _.ceil((data + 100) / 2)
					min = data
					max = nums
					test(max)
				} else if (response.body === 'bigger') {
					max = _.ceil((min + max) / 2)
					test(max)
				} else if (response.body === 'equal') {
					console.log(data)
				}
			}
		}).catch((err) => {
			console.log(err)
		})
}
function main() {
	start()
	num = _.random(0, 1000000)
	test(num)
}
main()

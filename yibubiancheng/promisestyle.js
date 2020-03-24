const rp = require('request-promise')
const _ = require('lodash')

function start() {
	const options = {
		method: 'GET',
		url: 'http://127.0.0.1:3000/start',
	}
	rp(options)
		.then((response) => {
			console.log(response)
		})
}

function comparenumbers(data, min, max) {
	const options1 = {
		method: 'GET',
		url: `http://127.0.0.1:3000/${data}`,
	}
	rp(options1)
		.then((response) => {
			if (response === 'smaller') {
				const nums = _.ceil((data + max) / 2)
				return comparenumbers(nums, data, max)
			} if (response === 'bigger') {
				const nums = _.ceil((data + min) / 2)
				return comparenumbers(nums, min, data)
			} if (response === 'equal') {
				console.log(data)
			}
		})
}

function main() {
	const MIN = 0
	const MAX = 1000000
	start()
	const num = _.random(0, MAX)
	comparenumbers(num, MIN, MAX)
}
try {
	main()
} catch (e) {
	console.log(e)
}

const rp = require('request-promise')
const _ = require('lodash')


async function start() {
	const option = {
		method: 'GET',
		url: 'http://127.0.0.1:3000/start',
	}
	const body = await rp(option)
	console.log(body)
}

async function comparenumbers(data, min, max) {
	const options = {
		method: 'GET',
		url: `http://127.0.0.1:3000/${data}`,
	}
	const body = await rp(options)
	if (body === 'smaller') {
		const nums = _.ceil((data + max) / 2)
		comparenumbers(nums, data, max)
	} else if (body === 'bigger') {
		const nums = _.ceil((data + min) / 2)
		comparenumbers(nums, min, data)
	} else if (body === 'equal') {
		console.log(data)
	}
}

try {
	const MIN = 0
	const MAX = 1000000
	const num = _.random(0, MAX)
	start()
	comparenumbers(num, MIN, MAX)
} catch (e) {
	console.log(e)
}

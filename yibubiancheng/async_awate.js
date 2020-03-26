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

async function CompareNumbers(data, min, max) {
	const options = {
		method: 'GET',
		url: `http://127.0.0.1:3000/${data}`,
	}
	const body = await rp(options)
	if (body === 'smaller') {
		const nums = _.ceil((data + max) / 2)
		return await CompareNumbers(nums, data, max)
	} if (body === 'bigger') {
		const nums = _.ceil((data + min) / 2)
		return await CompareNumbers(nums, min, data)
	} if (body === 'equal') {
		return data
	}
}

(async () => {
	try {
		const MIN = 0
		const MAX = 1000000
		const num = _.random(0, MAX)
		await start()
		const data = await CompareNumbers(num, MIN, MAX)
		console.log(data)
	} catch (e) {
		console.log(e)
	}
})()

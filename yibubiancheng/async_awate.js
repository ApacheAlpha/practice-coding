const rp = require('request-promise')
const _ = require('lodash')

let MIN = 0
let MAX = 1000000
async function start() {
	const option = {
		method: 'GET',
		url: 'http://127.0.0.1:3000/start',

	}
	const body = await rp(option)
	console.log(body)
}


async function comparenumbers(data) {
	const options = {
		method: 'GET',
		url: `http://127.0.0.1:3000/${data}`,
	}
	const body = await rp(options)
	if (body === 'smaller') {
		const nums = _.ceil((data + 1000000) / 2)
		MIN = data
		MAX = nums
		comparenumbers(MAX)
	} else if (body === 'bigger') {
		MAX = _.ceil((MIN + MAX) / 2)
		comparenumbers(MAX)
	} else if (body === 'equal') {
		console.log(data)
	}
}

try {
	const num = _.random(0, 1000000)
	start()
	comparenumbers(num)
} catch (e) {
	console.log(e)
}

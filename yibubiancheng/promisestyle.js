const rp = require('request-promise')
const _ = require('lodash')

let MIN = 0
let MAX = 1000000
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

function comparenumbers(data) {
	const options1 = {
		method: 'GET',
		url: `http://127.0.0.1:3000/${data}`,
	}
	rp(options1)
		.then((response) => {
			if (response === 'smaller') {
				const nums = _.ceil((data + 1000000) / 2)
				MIN = data
				MAX = nums
				comparenumbers(MAX)
			} else if (response === 'bigger') {
				MAX = _.ceil((MIN + MAX) / 2)
				comparenumbers(MAX)
			} else if (response === 'equal') {
				console.log(data)
			}
		})
}

function main() {
	start()
	const num = _.random(0, 1000000)
	comparenumbers(num)
}
try {
	main()
} catch (e) {
	console.log(e)
}

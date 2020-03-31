const rp = require('request-promise')
const _ = require('lodash')

function start() {
		const options = {
				method: 'GET',
				url: 'http://127.0.0.1:3000/start',
		}
		return rp(options)
				.then((response) => {
						console.log(response)
				})
}

function compareNumbers(data, min, max) {
		const options1 = {
				method: 'GET',
				url: `http://127.0.0.1:3000/${data}`,
		}
		return rp(options1)
				.then((response) => {
						if (response === 'smaller') {
								const nums = _.ceil((data + max) / 2)
								return compareNumbers(nums, data, max)
						}
						if (response === 'bigger') {
								const nums = _.ceil((data + min) / 2)
								return compareNumbers(nums, min, data)
						}
						if (response === 'equal') {
								return data
						}
						throw new Error('response not equal to equal or bigger or smaller')
				})
}

function main() {
		const MIN = 0
		const MAX = 1000000
		const num = _.random(0, MAX)
		// 串行执行
		start().then(() => compareNumbers(num, MIN, MAX).then((data) => {
				console.log(data)
		})).catch((error) => {
				console.log(error)
		})
}
main()

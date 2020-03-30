const _ = require('lodash')
const req = require('request-promise')
const should = require('should')

async function start() {
		const body = await req.get('http://127.0.0.1:3000/start')
		console.log(body)
		return body
}

async function compareNumbers(data, min, max) {
		const body = await req.get(`http://127.0.0.1:3000/${data}`)
		if (body === 'smaller') {
				const nums = _.ceil((data + max) / 2)
				return compareNumbers(nums, data, max)
		}
		if (body === 'bigger') {
				const nums = _.ceil((data + min) / 2)
				return compareNumbers(nums, min, data)
		}
		if (body === 'equal') {
				return body
		}
}

// 第一种写法
describe('GET /number', () => {
		it('should equal ', () => {
				const MIN = 0
				const MAX = 100000
				const num = _.random(0, MAX)
				return start().then(() => {
						compareNumbers(num, MIN, MAX).then((data) => data.should.equal('equal'))
				})
		})
})

// 第二种写法
describe('GET /number', () => {
		it('should equal ', async () => {
				const MIN = 0
				const MAX = 100000
				const num = _.random(0, MAX)
				const data = await start()
				data.should.equal('OK')
				const number = await compareNumbers(num, MIN, MAX)
				number.should.equal('equal')
		})
})

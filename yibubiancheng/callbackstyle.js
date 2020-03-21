const request = require('request')
const _ = require('lodash')

let num
let nums
let min = 0
let max = 1000000

request.get('http://localhost:3000/start',
	(err, response, body) => {
		if (err) throw err
		if (!err && response.statusCode === 200) {
			console.log(body)
		}
	})

function comparenumbers(datas) {
	request.get(`http://localhost:3000/${datas}`,
		(err, response, body) => {
			if (err) throw err
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
				}
			}
		})
}

function main(callback) {
	num = _.random(0, max)
	callback(num)
}
main(comparenumbers)

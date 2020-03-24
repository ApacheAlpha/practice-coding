const request = require('request')
const _ = require('lodash')

let MIN = 0
let MAX = 1000000
function start(callback) {
	request.get('http://localhost:3000/start',
		(err, response, body) => {
			if (err) {
				callback(err)
			}
			if (!err && response.statusCode === 200) {
				console.log(body)
			}
		})
}

function comparenumbers(datas, callback) {
	request.get(`http://localhost:3000/${datas}`,
		(err, response, body) => {
			if (err) {
				callback(err)
			}
			if (!err && response.statusCode === 200) {
				if (body === 'smaller') {
					const nums = _.ceil((datas + 100) / 2)
					MIN = datas
					MAX = nums
					comparenumbers(MAX)
				} else if (body === 'bigger') {
					MAX = _.ceil((MIN + MAX) / 2)
					comparenumbers(MAX)
				} else if (body === 'equal') {
					console.log(datas)
				}
			}
		})
}

const num = _.random(0, 100)
start()
comparenumbers(num)

const request = require('request')
const _ = require('lodash')

let num
let nums
let min = 0
let max = 1000000

request.get('http://localhost:3000/start',
    function (err, response, body) {
        if (!err && response.statusCode === 200) {
            console.log(body)
        }
    })

function test(num) {
    request.get('http://localhost:3000/' + num,
        function (err, response, body) {
            if (!err && response.statusCode === 200) {
                if (body === 'smaller') {
                    nums = _.floor((num + 100) / 2)
                    min = num
                    max = nums
                    test(max)
                } else if (body === 'bigger') {
                    max = _.ceil((min + max) / 2)
                    test(max)
                } else if (body === 'equal') {
                    console.log(num)
                }
            }
        })
}

function main(callback) {
    num = _.random(0, 1000000)
    callback(num)
}

main(test)
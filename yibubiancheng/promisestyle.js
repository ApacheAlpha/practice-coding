const request = require('request')
const _ = require('lodash')

let num
let nums
let min = 0
let max = 1000000

function start() {
    return new Promise((resolve, reject) => {
        request.get('http://127.0.0.1:3000/start',
            function (err, response, body) {
                if (!err && response.statusCode === 200) {
                    resolve(body)
                }
            })
    })
}

function test(num) {
    return new Promise((resolve, reject) => {
        request.get('http://localhost:3000/' + num,
            function (err, response, body) {
                if (!err && response.statusCode === 200) {
                    if (body === 'smaller') {
                        nums = _.ceil((num + 100) / 2)
                        min = num
                        max = nums
                        test(max)
                    } else if (body === 'bigger') {
                        max = _.ceil((min + max) / 2)
                        test(max)
                    } else if (body === 'equal') {
                        console.log(num)
                        resolve(num)
                    }
                }
            })
    })
}

function main() {
    const num = _.random(0, 1000000)
    console.log(num)
    start().then((data) => {
        console.log(data)
    })
    test(num).then((result) => {
        console.log(result)
    })
}

main()


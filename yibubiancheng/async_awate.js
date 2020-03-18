const request = require('request')
const _ = require('lodash')

let num
let nums
let min = 0
let max = 1000000

function start() {
    return new Promise((resolve, reject) => {
        request.get('http://localhost:3000/start',
            function (err, response, body) {
                if (!err && response.statusCode === 200) {
                    response.body = body
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

async function main() {
    const starts = await start()
    console.log(starts)
    const num = _.random(0, 1000000)
    let data = await test(num)
    console.log(data)
}

main()



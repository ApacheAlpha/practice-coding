const _ = require('lodash')
const requests = require('request')


let url
let num
let nums
let min = 0
let max = 100

requests.get('http://127.0.0.1:3001/start', function (err, response, body) {
    if (!err && response.statusCode === 200) {
        console.log(body)
    }
})

function test(num) {
    return new Promise((resolve, reject) => {
        requests.get( 'http://127.0.0.1:3001/' + num, function (err, response, body) {
            if (!err && response.statusCode === 200) {
                if (body === 'smaller') {
                    nums = _.ceil((num + 100) / 2)
                    console.log(nums)
                    min = num
                    max = nums
                    test(max)
                } else if (body === 'bigger') {
                    max = _.ceil((min + max) / 2)
                    test(max)
                } else if (body === 'equal') {
                    resolve(num)
                }
            }
        })
    })
}

function main() {

    num = _.random(0, 100)
    test(num).then((data) => {
        console.log(data)
    })
}

main()
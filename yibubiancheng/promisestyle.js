const request = require('request')
const _ = require('lodash')

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

function test() {
    return new Promise((resolve, reject) => {
        const num = _.random(0, 100)
        request.get('http://localhost:3000/' + num,
            function (err, response, body) {
                if (!err && response.statusCode === 200) {
                    switch (body) {
                        case 'bigger':
                            resolve(body)
                            break
                        case 'smaller':
                            resolve(body)
                            break
                        case 'equla':
                            resolve(body)
                            break
                    }
                }
            })
    })
}

function main() {
    start().then((data) => {
        console.log(data)
    })
    test().then((result) => {
        console.log(result)
        switch (result) {
            case 'bigger':
                console.log("bigger")
                main()
                break
            case 'smaller':
                console.log('smaller')
                main()
                break
            case 'equla':
                console.log('equla')
                break
        }
    })
}

main()


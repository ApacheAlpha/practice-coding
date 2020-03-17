const request = require('request')
const _ = require('lodash')

function start() {
    return new Promise((resolve, reject) => {
        request.get('http://localhost:3000/start',
            function (err, response, body) {
                if (!err && response.statusCode === 200) {
                    console.log(body)
                    resolve(body)
                }
            })
    })
}

function test() {
    const num = _.random(0, 100)
    return new Promise((resolve, reject) => {
        request.get('http://localhost:3000/' + num,
            function (err, response, body) {
                if (!err && response.statusCode === 200) {
                    switch (body) {
                        case 'bigger':
                            console.log('bigger')
                            resolve(body)
                            break
                        case 'smaller':
                            console.log('smaller')
                            resolve(body)
                            break
                        case 'equla':
                            console.log('equla')
                            resolve(body)
                            break
                    }
                }
            })
    })
}

async function main() {
    const starts = await start()
    console.log(starts)
    while (true) {
        let data = await test()
        console.log(data)
        if (data === 'equla') {
            break
        }
    }
}

main()



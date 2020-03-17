const _ = require('lodash')
const redis = require('redis')
const requests = require('request')


url = 'http://127.0.0.1:3001/start'
requests.get(url, function (err, response, body) {
    if (!err && response.statusCode === 200) {
        console.log(body)
    }
})

function to() {
    const num = _.random(0, 100)
    return new Promise((resolve, reject) => {
        url = 'http://127.0.0.1:3001/' + num
        requests.get(url, function (err, response, body) {
            if (!err && response.statusCode === 200) {
                resolve(body)
            }
        })
    })
}

async function test() {
    while (true) {
        let data = await to()
        console.log(data)
        if (data === 'equla') {
            break
        }
    }
}

test()




const request = require('request')
const _ = require('lodash')

request.get('http://localhost:3000/start',
    function (err, response, body) {
        if (!err && response.statusCode === 200) {
            console.log(body)
        }
    })


function test2() {
    const num = _.random(0, 100)
    request.get('http://localhost:3000/' + num,
        function (err, response, body) {
            if (!err && response.statusCode === 200) {
                switch (body) {
                    case 'bigger':
                        test2()
                        break
                    case 'smaller':
                        test2()
                        break
                    case 'equla':
                        break
                }
            }
        })
}

function main(callback) {
    callback()
}

main(test2)
const express = require('express')
const session = require('express-session')
const express1 = express()

const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017/test1'

function findname(){
    const arr = []
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
            if (err) {
                console.log(err)
            }
            const dbase = db.db('test1')
            dbase.collection('user').find({}).toArray(function (err, result) { // 返回集合中所有数据
                if (err) {
                    console.log(err)
                }
                for (let i = 0;i < result.length;i++) {
                    arr.push(result[i]['name'])
                }
                resolve(arr)
            })
        })
    })
}

function findpassword(){
    const arr = []
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
            if (err) {
                console.log(err)
            }
            const dbase = db.db('test1')
            dbase.collection('user').find({}).toArray(function (err, result) { // 返回集合中所有数据
                if (err) {
                    console.log(err)
                }
                for (let i = 0;i < result.length;i++) {
                    arr.push(result[i]['password'])
                }
                resolve(arr)
            })
        })
    })
}

function find_id(name,password){
    const arr = []
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
            if (err) {
                console.log(err)
            }
            const dbase = db.db('test1')
            dbase.collection('user').find({'name':name,'password':password}).toArray(function (err, result) { // 返回集合中所有数据
                if (err) {
                    console.log(err)
                }
                resolve(result[0])
            })
        })
    })
}

express1.use(session({
    secret: 'hubwizefgjklvsapp', //secret的值建议使用随机字符串
    cookie: {maxAge: 60 * 1000 * 30} // 过期时间（毫秒）
}))

express1.get('/login', async (req, res)=> {
    console.log(req.query)
    const name = req.query['name']
    const password = req.query['password']
    const findnames = await findname()
    const findpasswords = await findpassword()
    const find_ids = await find_id(name,password)
    const user = {userid:find_ids['_id']}
    if(findnames.includes(name) && findpasswords[findnames.indexOf(name)]===password){
        req.session.user = user
        res.send(`Hello ${name}`)
    }
})
module.exports =express1.listen(3001)


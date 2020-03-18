const Koa = require('koa')
const koans = new Koa()
const router = require('koa-router')
const routers = new router()
const _ = require('lodash')
const md5=require('md5')
const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017/test1'

function insername(name,salt,md5password){
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) {
            console.log(err)
        }
        const dbase = db.db('test1')
        const user = { name: name, salt:salt,password:md5password }
        dbase.collection('user').insertOne(user, function(err, res) {
            if (err) {
                console.log(err)
            }
            console.log('数据插入成功')
            db.close()
        })
    })
}

function findallname(){
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

function result(allname,name){
    return new Promise((resolve, reject) => {
        if (allname.includes(name)){
            resolve(false)
        }
        resolve(true)
    })
}

routers.get('/register', async  (ctx, next) => {
    let name = ctx.query['name']
    let password = ctx.query['password']
    let salt = _.random(0,100)
    let md5password = md5(name+salt+password)
    let allname = await findallname()
    let len = allname.length
    let results = await result(allname,name)
    if(results===false){
        console.log('名字已经存在')
        ctx.body='名字已经存在'
    }else {
        insername(name,salt,md5password)
        ctx.body='插入成功'
    }
})

koans.use(routers.routes()) //作用：启动路由
koans.use(routers.allowedMethods())
module.exports = koans.listen(3000)

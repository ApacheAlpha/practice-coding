const Koa = require('koa')
const koans = new Koa()
const router = require('koa-router')
const routers = new router()

const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017/test1'

function del(){
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) {
            console.log(err)
        }
        const dbase = db.db('test1')
        dbase.collection('user').deleteMany({}, function(err, obj) {
            if (err) {
                console.log(err)
            }
            console.log(obj.result.n + " 条数据被删除")
            db.close()
        })
        dbase.collection('number').deleteMany({}, function(err, obj) {
            if (err) {
                console.log(err)
            }
            console.log(obj.result.n + " 条数据被删除")
            db.close()
        })

    })
}

routers.get('/delete', (ctx, next) => {
    del()
})
koans.use(routers.routes()) //作用：启动路由
koans.use(routers.allowedMethods())
module.exports = koans.listen(3000)

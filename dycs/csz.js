//猜数字游戏
const Koa = require('koa')
const koans = new Koa()
const router = require('koa-router')
const routers = new router()
const _ = require('lodash')
const redis = require('redis')
const bodyparser = require('koa-bodyparser')

const client = redis.createClient(6379, '127.0.0.1')

routers.get('/start',  (ctx, next) => {
    global.num = _.random(0, 100)
    console.log(num)
    ctx.body = 'OK'
    client.set('num',num)
})

routers.get('/:number', (ctx, next) => {
    //从ctx中读取get传值
    global.num = num
    console.log(num)
    let num1 = ctx.params['number']
    if (num > Number(num1)) {
        ctx.body = 'smaller'
    }
    else if (num < Number(num1)) {
        ctx.body = 'bigger'
    }
    else {
        ctx.body = 'equla'
    }
})
koans.use(routers.routes()) //作用：启动路由
koans.use(routers.allowedMethods())
koans.use(bodyparser())
module.exports = koans.listen(3001)

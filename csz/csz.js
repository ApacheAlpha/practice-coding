//猜数字游戏
const Koa = require('koa')
const koans = new Koa()
const router = require('koa-router')
const routers = new router()
const _ = require('lodash')

let num
routers.get('/start', (ctx, next) => {
    num = _.random(0, 100)
    ctx.body = 'OK'
})

routers.get('/:number', (ctx, next) => {
    //从ctx中读取get传值
    let data = num
    let num1 = ctx.params['number']
    if (data > Number(num1)) {
        ctx.body = 'bigger'
    } else if (data < Number(num1)) {
        ctx.body = 'smaller'
    } else {
        ctx.body = 'equal'
        num = _.random(0, 100)
    }
})

koans.use(routers.routes()) //作用：启动路由
koans.use(routers.allowedMethods())
koans.listen(3000)
// 可以多例部署的猜数字游戏
const koa = require('koa')
const koans = new koa()
const router = require('koa-router')
const routers = new router()
const redis = require('redis')
const _ = require('lodash')
const cors = require('koa-cors')

// 建立redis的链接
const client = redis.createClient(6379, '127.0.0.1')

let num
routers.get('/start', (ctx, next) => {
    num = _.random(0, 100)
    //每次start开始就重置并保存num的进入redis
    client.set('num', num)
    ctx.body = 'OK'
})

//获取num,目前只会这种写法
function test() {
    return new Promise((resolve, reject) => {
        client.get('num', (err, data) => {
            resolve(data)
        })
    })
}

routers.get('/:number', async (ctx, next) => {
    //获取num的值
    let data = await test()
    let num1 = ctx.params['number']
    if (data > Number(num1)) {
        ctx.body = 'smaller'
    } else if (data < Number(num1)) {
        ctx.body = 'bigger'
    } else {
        ctx.body = 'equal'
    }
})

koans.use(cors())
koans.use(routers.routes())//作用：启动路由
koans.use(routers.allowedMethods())
koans.listen(3001)

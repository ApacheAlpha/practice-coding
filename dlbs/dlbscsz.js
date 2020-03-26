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

routers.get('/start',  (ctx, next) => {
    // 生成随机数，如果num这个key没有值，则设置一个键值对，如果已经存在，则直接取出
    global.num = _.random(0, 100)
    ctx.body='OK'

    client.select('2',(err)=>{
        if(err){
            console.log(err)
        }else {
            //获取num的值，没有则重新设定
            client.get('num', (err, data) => {
                if (err) {
                    console.log(err)
                }
                if (data === null) {
                    client.set('num', num)
                }
            })
        }
    })
})

//获取redis中的num的值
async function test(){
    return new Promise((resolve,reject)=>{
        client.get('num', (err, data) => {
            resolve(data)
        })
    })
}

async function main(){
    const data = await test()  //获取异步方法里面的数据
    routers.get('/:number', (ctx, next) => {
        //从ctx中读取get传值
        let num1 = ctx.params['number']
        if (data > Number(num1)) {
            ctx.body = 'smaller'
        }
        else if (data < Number(num1)) {
            ctx.body = 'bigger'
        }
        else {
            ctx.body = 'equla'
        }
    })
}
main()
koans.use(cors())
koans.use(routers.routes())//作用：启动路由
koans.use(routers.allowedMethods())
koans.listen(3000)
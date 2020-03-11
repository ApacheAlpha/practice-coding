// 可以多例部署的猜数字游戏
const koa = require('koa')
const koas = new koa()
const router = require('koa-router')
const routers = new router()
const redis = require('redis')
const _ = require('lodash')

// 建立redis的链接
const client = redis.createClient(6379, '127.0.0.1')
//从2号数据库中取数据
client.select('2', (err) => {
    if (err) {
        console.log(err)
    } else {
        // 生成随机数，如果num这个key没有值，则设置一个键值对，如果已经存在，则打印提示
        global.num = _.random(0, 100)
        client.get('num', (err, data) => {
            if(err){
                console.log(err)
            }
            if(data===null){
                client.set('num', num)
            }
            else{
                console.log('num已经有值且不可改变')
                console.log(data)
            }
        })
    }
})

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
        num1 = ctx.params['number']
        if (data > Number(num1)) {
            ctx.body = 'bigger'
        }
        else if (data < Number(num1)) {
            ctx.body = 'smaller'
        }
        else {
            ctx.body = 'equla'
        }
    })
}
main()
koas.use(routers.routes())//作用：启动路由
koas.use(routers.allowedMethods())
koas.listen(3000)




// 可以多例部署的猜数字游戏，
// 之前代码风格只生效了部分，已经重新配置
const Koa = require('koa')
const redis = require('redis')
const _ = require('lodash')
const Router = require('koa-router')
const cors = require('koa-cors')

const koans = new Koa()
const routers = new Router()


// 建立redis的链接
const client = redis.createClient(6379, '127.0.0.1')

routers.get('/start', (ctx) => {
	// 每次start开始就重置并保存num的进入redis
	const num = _.random(0, 100)
	client.set('num', num)
	ctx.body = 'OK'
})

// 获取num,目前就会这种写法
function getnum() {
	return new Promise((resolve, reject) => {
		client.get('num', (err, data) => {
			resolve(data)
			reject(err)
		})
	})
}

routers.get('/:number', async (ctx) => {
	const num1 = ctx.params.number
	if (await getnum() > Number(num1)) {
		ctx.body = 'smaller'
	} else if (await getnum() < Number(num1)) {
		ctx.body = 'bigger'
	} else {
		ctx.body = 'equal'
	}
})

koans.use(cors())
koans.use(routers.routes())// 作用：启动路由
koans.use(routers.allowedMethods())
koans.listen(3000)

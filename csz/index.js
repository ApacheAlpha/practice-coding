// 猜数字游戏
const Koa = require('koa')
const Router = require('koa-router')
const _ = require('lodash')

const koans = new Koa()
const routers = new Router()

let num
routers.get('/start', (ctx) => {
	num = _.random(0, 100)
	ctx.body = 'OK'
})

routers.get('/:number', (ctx) => {
	const number = Number(ctx.params.number)
	// 用data接收await getnum()的值，减少await getnum()调用
	if (num > number) {
		ctx.body = 'bigger'
	} else if (num < number) {
		ctx.body = 'smaller'
	} else {
		ctx.body = 'equal'
		num = _.random(0, 100)
	}
})

koans.use(routers.routes()) // 作用：启动路由
koans.use(routers.allowedMethods())
koans.listen(3000)

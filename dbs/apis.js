const Koa = require('koa')

const koans = new Koa()
const md5 = require('md5')
const Router = require('koa-router')
const session = require('koa-session-minimal')

const {
	insertName, findUser, findNumber, insertNumber,
} = require('./functions')

const routers = new Router()
const CONFIG = {
	key: 'koa:sess', /** 默认 */
	maxAge: 10000, /*  cookie的过期时间        【需要修改】  */
	overwrite: true, /** (boolean) can overwrite or not (default true)    没有效果，默认 */
	httpOnly: true, /**  true表示只有服务器端可以获取cookie */
	signed: true, /** 默认 签名 */
}
koans.use(session(CONFIG, koans))

routers.get('/register', async (ctx) => {
	const { name, password } = ctx.query
	const salt = String(Math.random() * 1000000)
	const md5password = md5(name + salt + password)
	const results = await findUser(name)
	if (results) {
		ctx.body = '名字已经存在'
	} else {
		insertName(name, salt, md5password)
		ctx.body = '数据插入成功'
	}
})

routers.get('/login', async (ctx) => {
	const { name, password } = ctx.query
	const results = await findUser(name)
	const { salt } = results
	const user = { userid: results._id }
	if (results && md5(name + salt + password) === results.password) {
		ctx.session.user = user
		ctx.body = `Hello ${name}`
	}
})

routers.get('/start', async (ctx) => {
	// 已经登陆
	if (ctx.session.user) {
		const { userid } = ctx.session.user
		const number = String(Math.random() * 1000000)
		insertNumber(String(userid), number)
		ctx.body = '欢迎来到这里'
	} else {
		// 未登录
		ctx.body = '请登陆后再尝试其他操作'
	}
})

routers.get('/api/:number', async (ctx) => {
	if (ctx.session.user) {
		const { userid } = ctx.session.user
		const data = await findNumber(userid)
		// 输入的number
		const { number } = ctx.params
		// mongodb中的number
		const monnum = data.number
		if (monnum > number) {
			ctx.body = 'big'
		} else if (monnum < number) {
			ctx.body = 'small'
		} else {
			ctx.body = 'equal'
		}
	} else {
		ctx.body = '请登陆后再尝试其他操作'
	}
})

koans.use(routers.routes()) // 作用：启动路由
koans.use(routers.allowedMethods())
module.exports = koans.listen(3000)

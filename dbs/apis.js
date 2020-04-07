const Koa = require('koa')
const md5 = require('md5')
const Router = require('koa-router')
const session = require('koa-session-minimal')
const {
	insertName, findUser, findNumber, insertNumber, ensureDB,
} = require('./functions')

const koans = new Koa()
const routers = new Router()
const CONFIG = {
	key: 'koa:sess', /** 默认 */
	maxAge: 10000, /*  cookie的过期时间        【需要修改】  */
	overwrite: true, /** (boolean) can overwrite or not (default true)    没有效果，默认 */
	httpOnly: true, /**  true表示只有服务器端可以获取cookie */
	signed: true, /** 默认 签名 */
}
koans.use(session(CONFIG, koans))

async function ensureLogin(ctx, next) {
	if (ctx.session.user) {
		return next()
	}
	ctx.status = 401
	ctx.body = '未经授权'
}

async function ensureDBConnection(ctx, next) {
	await ensureDB()
	await next()
}

routers.get('/register', ensureDBConnection, async (ctx) => {
	const { name, password } = ctx.query
	const salt = Math.random() * 1000000
	const md5password = md5(name + salt + password)
	const results = await findUser(name)

	if (results) {
		ctx.body = '名字已经存在'
	} else {
		await insertName(name, salt, md5password)
		ctx.body = '数据插入成功'
	}
})

routers.get('/login', ensureDBConnection, async (ctx) => {
	const { name, password } = ctx.query
	const user = await findUser(name)
	// 这里只解构salt、_id，因为ctx.query和results都包含password
	const { salt, _id } = user
	if (user && md5(name + salt + password) === user.password) {
		// 在这直接把_id转换为string
		ctx.session.user = { userid: _id.toString() }
		ctx.body = `Hello ${name}`
	}
})

routers.get('/start', ensureLogin, ensureDBConnection, async (ctx) => {
	const { userid } = ctx.session.user
	// 在ensureLogin转变_id类型，存储的userid就是字符串
	const number = Math.random() * 1000000
	await insertNumber(userid, number)
	ctx.body = '欢迎来到这里'
})

routers.get('/api/:number', ensureLogin, ensureDBConnection, async (ctx) => {
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
})

routers.get('/logout', ensureLogin, async (ctx) => {
	// 清空 session 中用户信息
	ctx.session.user = null
	ctx.body = '已经登出'
})

koans.use(routers.routes())
koans.use(routers.allowedMethods())
module.exports = koans.listen(3000)

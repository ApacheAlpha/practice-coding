const Koa = require('koa')

const koans = new Koa()
const _ = require('lodash')
const md5 = require('md5')
const Router = require('koa-router')
const session = require('koa-session-minimal')

const routers = new Router()
const CONFIG = {
	key: 'koa:sess', /** 默认 */
	maxAge: 10000, /*  cookie的过期时间        【需要修改】  */
	overwrite: true, /** (boolean) can overwrite or not (default true)    没有效果，默认 */
	httpOnly: true, /**  true表示只有服务器端可以获取cookie */
	signed: true, /** 默认 签名 */
}
koans.use(session(
	CONFIG, koans,
))
const {
	insername, findall, result, findid, findnumber, del, insernum,
} = require('./functions')


routers.get('/api/deletes', (ctx) => {
	del()
})

routers.get('/register', async (ctx) => {
	const { name } = ctx.query
	const { password } = ctx.query
	const salt = _.random(0, 100)
	const md5password = md5(name + salt + password)
	const allname = await findall()
	const results = await result(allname.arr, name)
	if (results === false) {
		console.log('名字已经存在')
		ctx.body = '名字已经存在'
	} else {
		insername(name, salt, md5password)
		ctx.body = '数据插入成功'
	}
})

routers.get('/login', async (ctx) => {
	const { name } = ctx.query
	const { password } = ctx.query
	const findnames = (await findall()).arr
	const findpasswords = (await findall()).arrs
	const find_id = await findid(name, password)
	const user = { userid: find_id._id }
	if (findnames.includes(name) && findpasswords[findnames.indexOf(name)] === password) {
		ctx.session.user = user
		ctx.body = `Hello ${name}`
	}
})

routers.get('/start', async (ctx) => {
	// 已经登陆
	if (ctx.session.user) {
		const { userid } = ctx.session.user
		const number = _.random(0, 100)
		insernum(userid, number)
		ctx.body = '欢迎再次来到这里'
	} else {
		// 未登录
		ctx.body = '请登陆后再尝试其他操作'
	}
})

routers.get('/:number', async (ctx) => {
	if (ctx.session.user) {
		const { userid } = ctx.session.user
		const data = await findnumber(userid)
		// 输入的number
		const number = ctx.params.number
		// mongodb中的number
		const monnum = data.number
		if (monnum > number) {
			ctx.body = 'big'
		} else if (monnum < number) {
			ctx.body = 'small'
			res.send('small')
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

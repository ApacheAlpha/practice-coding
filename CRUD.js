const Koa = require('koa')
const Router = require('koa-router')
const _ = require('lodash')
const md5 = require('md5')
const { MongoClient } = require('mongodb')
const express = require('express')
const session = require('express-session')


const routers = new Router()
const koans = new Koa()
const express1 = express()
const url = 'mongodb://localhost:27017/test1'

/*
连接数据库
MongoClient.connect(url, (err, db) => {
	if (err) {
		console.log('数据库连接失败')
	}
	console.log('数据库已连接')
	db.close()
})

创建user、number集合
MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
	if (err) {
		console.log(err)
	}
	const dbase = db.db('test1')
	dbase.createCollection('user', (err) => {
		if (err) {
			console.log(err)
		}
		console.log('创建user集合!')
		db.close()
	})

	dbase.createCollection('number', (err) => {
		if (err) {
			console.log(err)
		}
		console.log('创建number集合!')
		db.close()
	})
})

 */

/*
注册
function insername(name, salt, md5password) {
	MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
		if (err) {
			console.log(err)
		}
		const dbase = db.db('test1')
		const user = { name, salt, password: md5password }
		dbase.collection('user').insertOne(user, (err) => {
			if (err) {
				console.log(err)
			}
			console.log('数据插入成功')
			db.close()
		})
	})
}

function findallname() {
	const arr = []
	return new Promise((resolve, reject) => {
		MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
			if (err) {
				reject(err)
			}
			const dbase = db.db('test1')
			dbase.collection('user').find({}).toArray((err, result) => { // 返回集合中所有数据
				if (err) {
					reject(err)
				}
				for (let i = 0; i < result.length; i++) {
					arr.push(result[i].name)
				}
				resolve(arr)
			})
		})
	})
}

function result(allname, name) {
	return new Promise((resolve, reject) => {
		if (allname.includes(name)) {
			resolve(false)
		}
		resolve(true)
	})
}

routers.get('/register', async (ctx) => {
	const { name } = ctx.query
	const { password } = ctx.query
	const salt = _.random(0, 100)
	const md5password = md5(name + salt + password)
	const allname = await findallname()
	const results = await result(allname, name)
	if (results === false) {
		console.log('名字已经存在')
		ctx.body = '名字已经存在'
	} else {
		insername(name, salt, md5password)
		ctx.body = '插入成功'
	}
})

koans.use(routers.routes()) // 作用：启动路由
koans.use(routers.allowedMethods())
module.exports = koans.listen(3000)
*/

/*
登陆：与register公用一个findallname()函数
function findpassword() {
	const arr = []
	return new Promise((resolve, reject) => {
		MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
			if (err) {
				reject(err)
			}
			const dbase = db.db('test1')
			dbase.collection('user').find({}).toArray((err, result) => { // 返回集合中所有数据
				if (err) {
					console.log(err)
				}
				for (let i = 0; i < result.length; i++) {
					arr.push(result[i].password)
				}
				resolve(arr)
			})
		})
	})
}

function find_id(name, password) {
	return new Promise((resolve, reject) => {
		MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
			if (err) {
				reject(err)
			}
			const dbase = db.db('test1')
			dbase.collection('user').find({ name, password }).toArray((err, result) => { // 返回集合中所有数据
				if (err) {
					reject(err)
				}
				resolve(result[0])
			})
		})
	})
}

express1.use(session({
	secret: 'hubwizefgjklvsapp',
	cookie: { maxAge: 60 * 1000 * 30 }, // 过期时间（毫秒）
}))

express1.get('/login', async (req, res) => {
	console.log(req.query)
	const { name } = req.query
	const { password } = req.query
	const findallname = await findallname()
	const findpasswords = await findpassword()
	const find_ids = await find_id(name, password)
	const user = { userid: find_ids._id }
	if (findnames.includes(name) && findpasswords[findnames.indexOf(name)] === password) {
		req.session.user = user
		res.send(`Hello ${name}`)
	}
})
module.exports = express1.listen(3000)
*/

/*
start接口实现，每次start之前都要先login，否则就会被拦截
function insername(userid, number) {
	MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
		if (err) {
			console.log(err)
		}
		const dbase = db.db('test1')
		const user = { userid, number }
		dbase.collection('number').insertOne(user, (err, res) => {
			if (err) {
				console.log(err)
			}
			console.log('数据插入成功')
			db.close()
		})
	})
}

express1.use(session({
	secret: 'hubwizefgjklvsapp',
	cookie: { maxAge: 60 * 1000 * 30 }, // 过期时间（毫秒）
}))

login后调用start接口
express1.get('/start', (req, res) => {
	// 已经登陆
	if (req.session.user) {
		const userid = req.session.user
		const number = _.random(0, 100)
		insername(userid, number)
		res.send('欢迎再次来到这里')
	} else {
		// 未登录
		res.send('请登陆后再尝试其他操作')
		console.log(req.session)
	}
})
module.exports = express1.listen(3000)

 */

/*
number接口实现，每次调用number之前都要先login，否则就会被拦截

express1.get('/:number', async (req, res) => {
	if (req.session.user) {
		const userid = req.session.user
		const data = await findnumber(userid)
		// 输入的number
		const input = req.params.number
		// mongodb中的number
		const monnum = data.number
		if (monnum > input) {
			res.send('big')
		} else if (monnum < input) {
			res.send('small')
		} else {
			res.send('equal')
		}
	} else {
		res.send('请登陆后再尝试其他操作')
	}
})
module.exports = express1.listen(3000)
 */

/*
删除、删除

function del() {
	MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
		if (err) {
			console.log(err)
		}
		const dbase = db.db('test1')
		dbase.collection('user').deleteMany({}, (err, obj) => {
			if (err) {
				console.log(err)
			}
			console.log(`${obj.result.n} 条数据被删除`)
			db.close()
		})
		dbase.collection('number').deleteMany({}, (err, obj) => {
			if (err) {
				console.log(err)
			}
			console.log(`${obj.result.n} 条数据被删除`)
			db.close()
		})
	})
}

routers.get('/delete', () => {
	del()
})
koans.use(routers.routes()) // 作用：启动路由
koans.use(routers.allowedMethods())
module.exports = koans.listen(3000)

 */

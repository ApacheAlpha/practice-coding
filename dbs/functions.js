const md5 = require('md5')

let db
let client
let result

async function ensureDB() {
		const { MongoClient: Mongodb } = require('mongodb')
		client = new Mongodb('mongodb://127.0.0.1:27017')
		await client.connect()
		if (db) {
				return { db, client }
		}
		db = client.db('test1')
		return { db, client }
}

async function findUser(name) {
		result = await ensureDB()
		const collection = await result.db.collection('user')
		const data = await collection.findOne({ name })
		return data
}

async function insertName(name, salt, md5password) {
		result = await ensureDB()
		const user = { name, salt, password: md5password }
		const collection = await result.db.collection('user')
		await	collection.insertOne(user)
}

async function insertNumber(userid, number) {
		result = await ensureDB()
		const collection = await result.db.collection('number')
		await collection.update({ userid }, { $set: { number } }, { upsert: true })
}

async function findNumber(userid) {
		result = await ensureDB()
		const collection = await result.db.collection('number')
		const outcome = await collection.findOne({ userid })
		return outcome
}

async function ensureLogin(ctx, next) {
		if (ctx.session.user) {
				return next()
		}
		ctx.status = 401
		ctx.body = '未经授权'
}

module.exports = {
		ensureLogin,
		ensureDB,
		insertName,
		findUser,
		findNumber,
		insertNumber,
}

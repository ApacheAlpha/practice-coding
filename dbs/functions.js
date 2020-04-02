let db
let client
let result

async function getDb() {
		const { MongoClient: Mongodb } = require('mongodb')
		client = new Mongodb('mongodb://127.0.0.1:27017')
		await client.connect()
		db = client.db('test1')
		return { db, client }
}

async function findUser(name) {
		result = await getDb()
		const collection = await result.db.collection('user')
		const data = await collection.findOne({ name })
		return data
}

async function insertName(name, salt, md5password) {
		const user = { name, salt, password: md5password }
		const collection = await result.db.collection('user')
		await collection.insertOne(user)
}

async function insertNumber(userid, number) {
		const collection = await result.db.collection('number')
		await collection.update({ userid }, { $set: { number: `${number}` } }, { upsert: true })
}

async function findNumber(userid) {
		const collection = await result.db.collection('number')
		const outcome = await collection.findOne({ userid: `${userid}` })
		return outcome
}

module.exports = {
		getDb,
		insertName,
		findUser,
		findNumber,
		insertNumber,
}

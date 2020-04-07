let db
async function ensureDB() {
	const { MongoClient: Mongodb } = require('mongodb')
	const client = new Mongodb('mongodb://127.0.0.1:27017')
	await client.connect()
	if (db) {
		return { db, client }
	}
	db = client.db('test1')
	return { db, client }
}

async function findUser(name, dbs) {
	const collection = await dbs.collection('user')
	const data = await collection.findOne({ name })
	return data
}

async function insertName(name, salt, md5password, dbs) {
	const user = { name, salt, password: md5password }
	const collection = await dbs.collection('user')
	await collection.insertOne(user)
}

async function insertNumber(userid, number, dbs) {
	const collection = await dbs.collection('number')
	await collection.update({ userid }, { $set: { number } }, { upsert: true })
}

async function findNumber(userid, dbs) {
	const collection = await dbs.collection('number')
	const outcome = await collection.findOne({ userid })
	return outcome
}

module.exports = {
	insertName,
	findUser,
	findNumber,
	insertNumber,
	ensureDB,
}

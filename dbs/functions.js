let DB
let client

async function getDb() {
	const { MongoClient: MongoDB } = require('mongodb')
	client = new MongoDB('mongodb://127.0.0.1:27017')
	await client.connect()
	DB = client.db('test1')
}

async function insertName(name, salt, md5password) {
	await getDb()
	const user = { name, salt, password: md5password }
	const collection = await DB.collection('user')
	await collection.insertOne(user)
	client.close()
}

async function findUser(name) {
	await getDb()
	const collection = await DB.collection('user')
	const data = await collection.findOne({ name: `${name}` })
	client.close()
	return data
}

async function insertNumber(userid, numbers) {
	await getDb()
	const collection = await DB.collection('number')
	await collection.update({ userid: `${userid}` }, { $set: { number: `${numbers}` } }, { upsert: true })
	client.close()
}

async function findNumber(userid) {
	await getDb()
	const collection = await DB.collection('number')
	const result = await collection.findOne({ userid: `${userid}` })
	console.log(result)
	client.close()
	return result
}

module.exports = {
	insertName,
	findUser,
	findNumber,
	insertNumber,
}

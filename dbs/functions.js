async function getDb() {
	const { MongoClient: MongoDB } = require('mongodb')
	const client = new MongoDB('mongodb://127.0.0.1:27017')
	await client.connect()
	const DB = client.db('test1')
	return { DB, client }
}

async function insertName(name, salt, md5password) {
	const db = await getDb()
	const user = { name, salt, password: md5password }
	const collection = await db.DB.collection('user')
	await collection.insertOne(user)
	db.client.close()
}

async function insertNumber(userid, numbers) {
	const db = await getDb()
	const n = { userid, numbers }
	const collection = db.DB.collection('number')
	const data = await collection.find({ userid }).toArray()
	if (data.length === 0) {
		await collection.insertOne(n)
	} else {
		await collection.update({ userid: `${userid}` }, { $set: { numbers: `${numbers}` } })
	}
	db.client.close()
}

async function findUser(name) {
	const db = await getDb()
	const collection = await db.DB.collection('user')
	const data = await collection.find({ name }).toArray()
	db.client.close()
	return data
}

async function findId(name) {
	const db = await getDb()
	const collection = await db.DB.collection('user')
	const result = await collection.find({ name }).toArray()
	db.client.close()
	return result
}

async function findNumber(userid) {
	const db = await getDb()
	const collection = await db.DB.collection('number')
	const result = await collection.find({ userid }).toArray()
	db.client.close()
	return result
}

module.exports = {
	insertName,
	findUser,
	findId,
	findNumber,
	insertNumber,
}

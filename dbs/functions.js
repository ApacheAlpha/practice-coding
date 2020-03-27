const { MongoClient } = require('mongodb')

const url = 'mongodb://localhost:27017'

function connectDb(callback) {
	MongoClient.connect(url, (err, db) => {
		if (err) {
			callback(err)
		}
		callback(null,db)
		db.close()
	})
}

function insername(name, salt, md5password) {
	connectDb((db) => {
		const DB = db.db('test1')
		const user = { name, salt, password: md5password }
		const collection = DB.collection('user')
		collection.insertOne(user)
	})
}

function insernum(userid, number) {
	connectDb((db) => {
		const DB = db.db('test1')
		const n = { userid, number }
		const collection = DB.collection('number')
		collection.insertOne(n)
	})
}

function findall() {
	const arr = []
	const arrs = []
	return new Promise((resolve, reject) => {
		connectDb((db) => {
			const DB = db.db('test1')
			const collection = DB.collection('user')
			collection.find({}).toArray((err, result) => { // 返回集合中所有数据
				if (err) {
					reject(err)
				}
				for (let i = 0; i < result.length; i++) {
					arr.push(result[i].name)
					arrs.push(result[i].password)
				}
				resolve({ arr, arrs })
			})
		})
	})
}

function findid(name, password) {
	return new Promise((resolve, reject) => {
		connectDb((db) => {
			const DB = db.db('test1')
			const collection = DB.collection('user')
			collection.find({ name, password }).toArray((err, result) => { // 返回集合中所有数据
				if (err) {
					reject(err)
				}
				resolve(result[0])
			})
		})
	})
}

function findnumber(userid) {
	return new Promise((resolve, reject) => {
		connectDb((db) => {
			const DB = db.db('test1')
			const collection = DB.collection('number')
			collection.find({ userid }).toArray((err, result) => { // 返回集合中所有数据
				if (err) {
					reject(err)
				}
				resolve(result[0])
			})
		})
	})
}

function del() {
	connectDb((db) => {
		const DB = db.db('test1')

		DB.collection('number').deleteMany({}, (err, obj) => {
			if (err) {
				console.log(err)
			}
			console.log(`${obj.result.n} 条数据被删除`)
			db.close()
		})
		DB.collection('user').deleteMany({}, (err, obj) => {
			if (err) {
				console.log(err)
			}
			console.log(`${obj.result.n} 条数据被删除`)
			db.close()
		})
	})
}

function result(allname, name) {
	return new Promise((resolve) => {
		if (allname.includes(name)) {
			resolve(false)
		}
		resolve(true)
	})
}

module.exports = {
	insername,
	findall,
	result,
	findid,
	findnumber,
	del,
	insernum,
}

const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017/test1'

//创建user、number集合
MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
    if (err) {
        console.log(err)
    }
    const dbase = db.db('test1')
    dbase.createCollection('user', function (err, res) {
        if (err) {
            console.log(err)
        }
        console.log('创建user集合!')
        db.close()
    })

    dbase.createCollection('number', function (err, res) {
        if (err) {
            console.log(err)
        }
        console.log('创建number集合!')
        db.close()
    })
})

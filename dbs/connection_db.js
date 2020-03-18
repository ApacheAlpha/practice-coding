const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017/test1'

MongoClient.connect(url,function(err, db) {
    if (err) {
        console.log('数据库连接失败')
    }
    console.log('数据库已连接')
    db.close();
})

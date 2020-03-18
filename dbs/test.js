const chai = require('chai')
const _ = require('lodash')
const redis = require('redis')
const should = chai.should()
const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017/test1'



//register为例
const registers = require('./register')
// const login = require('./login')
// const start = require('./start')
// const number = require('./number')
// const del = require('./delete')

const request = require('supertest')(registers)
// const request = require('supertest')(login)
// const request = require('supertest')(start)
// const request = require('supertest')(number)
// const request = require('supertest')(del)


describe('GET /register', function () {
    it('数据插入成功 or 名字已经存在 ', function () {
        request
            .get('/register?name=reeeedeeddcd&password=23423')
            .end((err, res) => {
                console.log(res.text)
            })
    })

})

// describe('GET /login', function () {
//     it('respond ', function () {
//         request
//             .get('/login?name=rfcd&password=3456')
//             .end((err, res) => {
//             })
//     })
// })
//
//
// describe('GET /start', function () {
//     it('输出数据插入成功 ', function () {
//         request
//             .get('/start')
//             .end((err, res) => {
//                 console.log(res.text)
//             })
//     })
// })
//
// describe('GET /number', function () {
//     it('返回 big smell euqal ', function () {
//         request
//             .get('/30')
//             .end((err, res) => {
//                 console.log(res.text)
//             })
//     })
// })

// describe('GET /delete', function () {
//     it('返回 big smell euqal ', function () {
//         request
//             .get('/delete')
//             .end((err, res) => {
//                 console.log(res.text)
//             })
//     })
// })

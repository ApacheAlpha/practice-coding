const csz = require('./csz')
const request = require('supertest')(csz)
const chai = require('chai')
const _ = require('lodash')
const redis = require('redis')
const should = chai.should()
const num = _.random(0, 100)


describe('GET /start', function () {
    it('respond OK', function () {
        request
            .get('/start')
            .end((err, res) => {
                console.log(res.text)
                res.text.should.equal('OK')
            })
    })
})

describe('GET /number', function () {
    it('respond big or small or equal', function () {
        request
            .get('/' + (Number(num)))
            .end((err, res) => {
                console.log(res.text)
            })
    })
})

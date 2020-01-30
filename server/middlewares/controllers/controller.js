const queries = require('../../db/queries')
const config = require('../../../config/config.js')
const express = require('express')
const router = express.Router()

exports.main = async (req, res, next) => {
    try {
        res.send('bla')
    } catch(err){
        next(err)
    } 
}

exports.getUser = async (req, res, next) => {
    queries.findUser(req.params.id)
           .then( user => {
                    res.send(user)
                }) 
                .catch(err => {
                    next(err)
                })
}

exports.deleteUser = async (req, res, next) => {
    queries.deleteUser(req.body.id)
    .then( deletedCount => {
        res.send('User was deleted successfully!')
    })
    .catch( err => {
            next(err)
    })
}

exports.addNotification = async (req, res, next) => {
    router.post('https://fcm.googleapis.com/fcm/send', req.body.body.content, req.body.body.headers)
    // queries.addNotification(req.body.notification)
    .then( result => {
        res.end()
    })
    .catch( err => {
        next(err)
    })
}
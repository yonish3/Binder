const express = require('express')
const router = express.Router()
const controller = require('../middlewares/controllers/controller')
const User = require('../db/models/User')
// const mongoose = require('../db/mongoose')
router.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

    next()
})
router.get('/', controller.main)
router.get('/user/:id', controller.getUser)
router.delete('/user', controller.deleteUser)

router.post('/signIn', function(req, res){
    console.log(req.body)
    let detailes={firstName:req.body.firstName 
        , lastName: req.body.lastName , age:req.body.age ,
         status: req.body.status , desiredRelationship: req.body.desiredRelationship , intrestedIn: req.body.intrestedIn
          , gender: req.body.gender , picture:req.body.picture }
         let user= new User(detailes)
         user.save() 
         res.send("Done")
})

module.exports = router
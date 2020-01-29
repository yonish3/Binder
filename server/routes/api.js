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

router.post('/signIn', function (req, res) {
    // console.log(req.body.picture)
    if (req.body.picture === null) {
        req.body.picture = "https://firebasestorage.googleapis.com/v0/b/binder2-319a5.appspot.com/o/images%2FEmpty.jpg?alt=media&token=29961461-7c05-4af9-a6af-07dd614d57ad"
    }
    let detailes = {
        firstName: req.body.firstName
        , lastName: req.body.lastName, age: req.body.age,
        email: req.body.email, password: req.body.password,
        status: req.body.status, desiredRelationship: req.body.desiredRelationship, interestedIn: req.body.interestedIn
        , gender: req.body.gender, picture: req.body.picture
    }
    let user = new User(detailes)
    user.save()
    res.send("Done")
})

router.post('/checkEmail', async function(req, res){
         let emailAddress=req.body.address
         let checkIfExists= await  User.findOne({email: emailAddress}, function(err, result){
             if(result){
             res.send("exists")
             }
             else{
                 res.send("continue")
             }
         })  
})

router.post('/login', async function(req, res){
    let emailAddress=req.body.address
    let password=req.body.password
    console.log(req.body)
    let checkIfExists = await User.findOne({email: emailAddress , password: password}, function(err, result){
        console.log(result)
        if (result) {
            res.send(result)
        }
        else {
            res.send("login error")
        }
    })  

    
})

module.exports = router
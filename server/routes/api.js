const express = require('express')
const router = express.Router()
const controller = require('../middlewares/controllers/controller')
const User = require('../db/models/User')
const queries = require('../db/queries')
// const mongoose = require('../db/mongoose')
// router.use(function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*')
//     res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

//     next()
// })
router.get('/', controller.main)
router.get('/user/:id', controller.getUser)
router.delete('/user', controller.deleteUser)

router.post('/signIn', function(req, res){
    // console.log(req.body)
    let detailes={firstName:req.body.firstName 
        , lastName: req.body.lastName , age:req.body.age ,
        email: req.body.email,password:req.body.password,
         status: req.body.status , desiredRelationship: req.body.desiredRelationship , interestedIn: req.body.interestedIn
          , gender: req.body.gender , picture:req.body.picture }
         let user= new User(detailes)
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
    // res.cookie('emailAddress', emailAddress, {expires: new Date(2021, 1, 1)});
    // console.log(req.body)
    res.cookie('emailAddress', emailAddress, {expires: new Date(2021, 1, 1)});
    // const emailAddress = 
    console.log('in login email is ', req.cookies.emailAddress);
    

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

router.get("/home", async (req, res) => {
    const emailAddress = req.cookies.emailAddress
    console.log('in home route! email is ', emailAddress);

    try {
        const loggedInUser = await queries.findUserByEmailAddress(emailAddress)
        console.log('in home route! loggedIn user is', loggedInUser);
        res.status(200).send(loggedInUser)
    } catch (err) {
        console.log('in home route! Error is ', err);
        
        res.status(200).send("No user was found")
    }
    

    // if(emailAddress) {
    //     // Load user from database.
    //     res.status(200).send(emailAddress)
    // } else {
    //     console.log("No email was found");
        
    //     res.status(200).send("No email was found")
    // }
})

module.exports = router
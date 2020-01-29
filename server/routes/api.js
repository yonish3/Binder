const express = require('express')
const router = express.Router()
const controller = require('../middlewares/controllers/controller')
const User = require('../db/models/User')
<<<<<<< HEAD
const queries = require('../db/queries')
// const mongoose = require('../db/mongoose')
// router.use(function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*')
//     res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
=======

// const mongoose = require('../db/mongoose')


router.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
>>>>>>> development

//     next()
// })
router.get('/', controller.main)
router.get('/user/:id', controller.getUser)
router.delete('/user', controller.deleteUser)

<<<<<<< HEAD
router.post('/signIn', function(req, res){
    // console.log(req.body)
    res.cookie('emailAddress', emailAddress, {expires: new Date(2021, 1, 1)});
    let detailes={firstName:req.body.firstName 
        , lastName: req.body.lastName , age:req.body.age ,
        email: req.body.email,password:req.body.password,
         status: req.body.status , desiredRelationship: req.body.desiredRelationship , interestedIn: req.body.interestedIn
          , gender: req.body.gender , picture:req.body.picture }
         let user= new User(detailes)
         user.save() 
         res.send("Done")
=======
router.post('/signIn', function (req, res) {
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
>>>>>>> development
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
<<<<<<< HEAD
    // res.cookie('emailAddress', emailAddress, {expires: new Date(2021, 1, 1)});
    // console.log(req.body)
    res.cookie('emailAddress', emailAddress, {expires: new Date(2021, 1, 1)});
    // const emailAddress = 
    console.log('in login email is ', req.cookies.emailAddress);
    

=======
>>>>>>> development
    let checkIfExists = await User.findOne({email: emailAddress , password: password}, function(err, result){
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
        
        res.status(400).send("No user was found")
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
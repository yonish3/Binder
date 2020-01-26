const express = require('express')
const router = express.Router()
const controller = require('../middlewares/controllers/controller')

// router.use(function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*')
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

//     next()
// })

router.get('/', controller.main)
router.get('/user/:id', controller.getUser)
router.delete('/user', controller.deleteUser)

module.exports = router
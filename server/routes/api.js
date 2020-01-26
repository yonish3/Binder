const express = require('express')
const router = express.Router()
const controller = require('../middlewares/controllers/controller')

router.get('/', controller.socketConnect)
router.get('/user/:id', controller.getUser)
router.delete('/user', controller.deleteUser)

module.exports = router
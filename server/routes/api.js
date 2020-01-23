const express = require('express')
const router = express.Router()
const controller = require('../middlewares/controllers/controller')

router.get('/', controller.main)
router.get('/user/:id', controller.getUser)
router.delete('/user', controller.deleteUser)

router.get('/login/:username', controller.logIn)

module.exports = router
const express = require('express')
const router = express.Router()
const controller = require('../middlewares/controllers/controller')
// const { hasUser } = require('../middlewares/validations/validators')

router.get('/', controller.main)
router.get('/user/:id', controller.getUser)
router.delete('/user', controller.deleteUser)

// queries.findUser('5e270a0e2647322352129dae').then(user => console.log(user))
// queries.deleteUser('5e284327d80c499f21a2c9bd').then(user => console.log(user))

module.exports = router
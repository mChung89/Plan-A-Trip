const router = require('express').Router()
const { newUser } = require('../controllers/authController')


// router.post('/signin', login)
router.post('/createuser', newUser )

module.exports = router
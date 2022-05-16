const router = require('express').Router()
const { newUser, loginUser } = require('../controllers/authController')


// router.post('/signin', login)
router.post('/createuser', newUser )
router.post('/loginuser', loginUser)
module.exports = router
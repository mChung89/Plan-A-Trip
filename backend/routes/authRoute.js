const router = require('express').Router()
const { newUser, loginUser, getMe } = require('../controllers/authController')


// router.post('/signin', login)
router.get('/getme', getMe)
router.post('/createuser', newUser )
router.post('/loginuser', loginUser)
module.exports = router
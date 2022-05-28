const router = require('express').Router()
const { updateOneDate, updateTwoDates } = require('../controllers/dragDropController')

router.patch('/oneDate', updateOneDate )
router.patch('/twoDate', updateTwoDates)
module.exports = router
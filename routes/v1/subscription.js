const authMiddleware = require('./../../middlewares/auth')
const subscriptionContoroller = require('./../../controllers/v1/subscription')

const express = require('express')

const router = express.Router()

router.post('/buySubscription',authMiddleware,subscriptionContoroller.createSub)

module.exports = router
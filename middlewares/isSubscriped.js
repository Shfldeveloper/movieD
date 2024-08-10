const subscriptionModel = require('../models/subscription')

module.exports = async (req, res, next) => {
    if (req.user == false) {
        req.subscription = false
        next()
    }

    const userSubscription = await subscriptionModel.find({ subscriber: req.user._id })

    if(!userSubscription){
        req.subscription = false
        next()
    }

    const now = new Date()

    const subscriptionCreatedAtDate = new Date(userSubscription.createdAt)

    const diffrentINDays = (subscriptionCreatedAtDate - now) / (1000 * 60 * 60 * 24)

    if(diffrentINDays > userSubscription.howManyDays){
        const deleteSubscription = await subscriptionModel.deleteOne({subscriber: req.user._id})
        req.subscription = false
        next()
    }

    req.subscription = true
    next()


}
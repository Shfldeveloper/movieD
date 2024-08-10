const subscriptionModel = require('./../../models/subscription')

exports.createSub = async (req, res) => {
    const { howManyDays } = req.body
    const addSubscriber = await subscriptionModel.create({
        subscriber : req.user._id,
        howManyDays 
    })

    res.status(201).json(addSubscriber)

}
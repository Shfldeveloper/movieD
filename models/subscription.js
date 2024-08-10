const mongoose = require('mongoose')

const schema = mongoose.Schema({
    subscriber : {
        type:mongoose.Types.ObjectId,
        ref : 'User',
        required : true,
    },
    howManyDays : {
        type : Number,
        required : true,
    },
},{timestamps : true})

const model = mongoose.model('Subscription',schema)

module.exports = model
const mongoose = require('mongoose')

const schema = mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    time : {
        type : String,
        required : true,
    },
    free : {
        type : Number, 
        required : true,
    },
    video : {
        type : String, 
        required : true,
    },
    movie : {
        type : mongoose.Types.ObjectId, 
        ref : "movie",
        required : true,
    },

},{timestamps : true})

const model = mongoose.model('episode',schema)

module.exports = model
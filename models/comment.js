const mongoose = require('mongoose')

const schema = mongoose.Schema({

    body : {
        type : String,
        required : true,
    },
    movie : {
        type : mongoose.Types.ObjectId,
        ref : "Movie",
        required : true,
    },
    creator : {
        type : mongoose.Types.ObjectId,
        ref : "User",
        required : true,
    },
    isAccept : {
        type : Number,
        default : 0,
    },
    score : {
        type : Number,
        default : 5,
    },
    isAnswer:{
        type : Number,
        required : true,
    },
    mainCommentID :{
        type : mongoose.Types.ObjectId,
        ref : "Comment",
    }
},{timestamps : true})

const model = mongoose.model('Comment' , schema)

module.exports = model
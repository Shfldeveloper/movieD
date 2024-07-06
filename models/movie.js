const mongoose = require('mongoose')

const schema = mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    cover: {
        type: String,
        required: true,
    },
    href: {
        type: String,
        required: true,
    },
    cast: {
        type: String,
        required: true,
    },
    // price : {
    //     type : Number,
    //     // required : true,
    // },
    creator: {
        type:mongoose.Types.ObjectId,
        ref : 'User',
        required : true,
    },
    status: {
        type: String,
        required: true,
    },
    categoryID: {
        type: mongoose.Types.ObjectId,
        ref: 'Category',
        required: true,
    },

}, { timestamps: true })

schema.virtual('episodes',
    {
        ref : 'episode',
        localField : "_id",
        foreignField : "movie"

    }
)
schema.virtual('comments',
    {
        ref : 'comment',
        localField : "_id",
        foreignField : "movie"

    }
)

const model = mongoose.model('movie', schema)

module.exports = model
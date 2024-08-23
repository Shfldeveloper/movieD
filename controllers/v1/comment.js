const commentModel = require('../../models/comment')
const movieModel = require('../../models/movie')
const mongoose = require('mongoose')
exports.addComment = async (req, res) => {
    const { body, movieHref, score } = req.body

    const movie = await movieModel.findOne({ href: movieHref }).lean()

    const comment = await commentModel.create({ body, score, movie: movie._id, creator: req.user._id, isAnswer: 0, isAccept: 0 })

    res.status(201).json(comment)
}

exports.remove = async (req, res) => {
    const commentID = req.params.id
    const isIdValid = mongoose.Types.ObjectId.isValid(commentID)
    if (!isIdValid) {
        return res.status(402).json({ message: 'id is not valid' })
    }
    const deletedComment = await commentModel.deleteOne({ _id: commentID })
    return res.json(deletedComment)
}

exports.accept = async (req, res) => {
    const isIdValid = mongoose.Types.ObjectId.isValid(req.params.id)
    
    if(!isIdValid){
        return res.status(402).json({message : "the id that given is not valid."})
    }

    const acceptedComment = await commentModel.findOneAndUpdate({_id : req.params.id},{
        isAccept : 1
    })

    return res.status(201).json(acceptedComment)

}
exports.reject = async (req, res) => {

    const isIdValid = mongoose.Types.ObjectId.isValid(req.params.id)
    
    if(!isIdValid){
        return res.status(402).json({message : "the id that given is not valid."})
    }

    const rejectedComment = await commentModel.findOneAndUpdate({_id : req.params.id},{
        isAccept : 0
    })

    return res.status(201).json(rejectedComment)
}
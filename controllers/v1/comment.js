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

    if (!isIdValid) {
        return res.status(402).json({ message: "the id that given is not valid." })
    }

    const acceptedComment = await commentModel.findOneAndUpdate({ _id: req.params.id }, {
        isAccept: 1
    })

    return res.status(201).json(acceptedComment)

}
exports.reject = async (req, res) => {

    const isIdValid = mongoose.Types.ObjectId.isValid(req.params.id)

    if (!isIdValid) {
        return res.status(402).json({ message: "the id that given is not valid." })
    }

    const rejectedComment = await commentModel.findOneAndUpdate({ _id: req.params.id }, {
        isAccept: 0
    })

    return res.status(201).json(rejectedComment)
}
exports.answer = async (req, res) => {
    const id = req.params.id
    const { body } = req.body
    const isIDValid = mongoose.Types.ObjectId.isValid(id)

    if (!isIDValid) {
        return res.status(401).json({ message: "the given id is not valid." })
    }
    const acceptComment = await commentModel.findOneAndUpdate({ _id: id }, {
        isAccept: 1
    })

    const answerComment = await commentModel.create({
        body,
        movie: acceptComment.movie,
        creator: req.user._id,
        isAccept: 1,
        isAnswer: 1,
        mainCommentID: id
    })

    return res.status(201).json(answerComment)


}
exports.getAll = async (req, res) => {
    let comments = await commentModel.find({}).populate('movie').populate('creator','-password').lean()
    let newComments = []
    for(let i = 0 ; i< comments.length ; i++){
        for (let j =0 ;j< comments.lenght ; j++){
            if(comments[i].isAnswer == 0 && (com[j].isAnswer == 1 && com[j].mainCommentID == comments[i]._id)){
                comments[i].answers += com[j]
                console.log(comments[i])
            }else{
                console.log(comments[i])
                newComments.push(comments[i])
            }
        }
        newComments.push(comments[i])
    }


    res.json(newComments)
}
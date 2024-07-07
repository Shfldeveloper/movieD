const commentModel = require('../../models/comment')
const movieModel = require('../../models/movie')

exports.addComment = async (req, res) => {
    const { body, movieHref, score } = req.body

    const movie = await movieModel.findOne({ href: movieHref }).lean()

    const comment = await commentModel.create({ body, score, movie: movie._id, creator: req.user._id, isAnswer : 0 , isAccept : 0})

    res.status(201).json(comment)
}
const movieModel = require('../../models/movie')
const episodeModel = require('./../../models/episode')

exports.create = async (req, res) => {
    const {
        name,
        description,
        href,
        cast,
        status,
        categoryID
    } = req.body
    console.log(req.file.filename)
    const movie = await movieModel.create({
        name,
        description,
        creator: req.user._id,
        href,
        cast,
        status,
        categoryID,
        cover: req.file.filename,
    })

    console.log(movie)

    const mainMovie = await movieModel.findById(movie._id).populate('creator', '-password')

    return res.status(201).json(mainMovie)


}

exports.createEpisode = async (req, res) => {
    const { title, free, time } = req.body

    const { id } = req.params

    console.log(req.file.filename)

    const episode = await episodeModel.create({
        title,
        free,
        time,
        video: req.file.filename,
        movie: id,
    })

    return res.status(201).json(episode)


}

exports.getAllEpisodes = async (req, res) => {
    const episodes = await episodeModel.find().populate('movie', 'name')
    res.status(200).json(episodes)
}
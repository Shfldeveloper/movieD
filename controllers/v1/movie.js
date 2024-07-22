const movieModel = require('../../models/movie')
const categoryModel = require('../../models/category')
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

exports.getEpisodeInfo = async (req, res) => {
    const movie = await movieModel.findOne({ href: req.params.href }).lean()
    const episode = await episodeModel.findById({ _id: req.params.episodeID })
    const allEpisodes = await episodeModel.find({ movie: movie._id })
    return res.status(200).json(episode, allEpisodes)
}

exports.deleteEpisode = async (req, res) => {
    const deletedEpisode = await episodeModel.findOneAndDelete({ _id: req.params.id })

    if (!deletedEpisode) {
        res.status(505).json({ message: 'episode not found' })
    }

    res.json(deletedEpisode)
}

exports.getMovieByCategory = async (req, res) => {
    const { href } = req.params
    
    const category = await categoryModel.findOne({href})
    
    if(!category){
        return res.json({message : "category is not valid ..."})
    }


    const movies = await movieModel.find({
        categoryID : category._id
    })

    res.status(200).json(movies)
}
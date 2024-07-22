const express = require('express')
const multer = require('multer')
const multerStorage = require('../../utils/uploder')
const movieController = require('../../controllers/v1/movie')
const authMiddleware = require('./../../middlewares/auth')
const isAdminMiddleware = require('../../middlewares/isAdmin')



const router = express.Router()

router.route("/category/:href").get(movieController.getMovieByCategory)

router
    .route('/')
    .post(authMiddleware,
        isAdminMiddleware,
        multer({ storage: multerStorage, limits: { fileSize: 100000000000 } }).single('cover'),
        movieController.create)


router
    .route('/:id/episode')
    .post(authMiddleware,
         isAdminMiddleware,
         multer({ storage: multerStorage, limits: { fileSize: 100000000000 } }).single('video'),
         movieController.createEpisode
    )


router
    .route('/episode')
    .get(authMiddleware,
        isAdminMiddleware,
        movieController.getAllEpisodes,
    )


router.route("/:href/:episodeID").get(movieController.getEpisodeInfo )



router.route('/episode/:id').delete(authMiddleware,isAdminMiddleware,movieController.deleteEpisode)
module.exports = router
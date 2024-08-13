const express = require('express')
const commentController = require('./../../controllers/v1/comment')
const authMiddleware = require('./../../middlewares/auth')
const isAdminMiddleware = require('../../middlewares/isAdmin')

const router = express.Router()

router.route("/").post(authMiddleware,commentController.addComment)
router.route("/:id").delete(authMiddleware,isAdminMiddleware,commentController.remove)

module.exports = router
const express = require('express')
const commentController = require('./../../controllers/v1/comment')
const authMiddleware = require('./../../middlewares/auth')
const isAdminMiddleware = require('../../middlewares/isAdmin')

const router = express.Router()

router.route("/").post(authMiddleware,commentController.addComment)
router.route("/:id").delete(authMiddleware,isAdminMiddleware,commentController.remove)
router.route("/:id/accept").put(authMiddleware,isAdminMiddleware,commentController.accept)
router.route("/:id/reject").put(authMiddleware,isAdminMiddleware,commentController.reject)

module.exports = router
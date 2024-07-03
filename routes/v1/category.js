const CategoryModel = require('../../models/category')
const categoryController = require('../../controllers/v1/category')
const authMiddleware = require('./../../middlewares/auth')
const isAdminMiddleware = require('../../middlewares/isAdmin')

const express = require('express')

const router = express.Router()

router
    .route('/')
    .post(authMiddleware, isAdminMiddleware, categoryController.create)
    .get(authMiddleware, isAdminMiddleware, categoryController.getAll)
    
router
    .route("/:id")
    .put(authMiddleware, isAdminMiddleware, categoryController.update)
    .delete(authMiddleware, isAdminMiddleware, categoryController.delete)

module.exports = router
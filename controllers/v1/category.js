const categoryModel = require('../../models/category')
const mongoose = require('mongoose')

exports.create = async (req, res) => {

    const { title, href } = req.body

    const category = await categoryModel.create({ title, href })

    return res.status(201).json(category)

}
exports.getAll = async (req, res) => {

    const allCategories = await categoryModel.find({})

    return res.json(allCategories)
}
exports.update = async (req, res) => {
    const {id} = req.params

    const isValidID = await mongoose.Types.ObjectId.isValid(id)

    if (!isValidID) {
        return res.status(405).json({ message: 'id is not valid' })
    }

    const { href, title } = req.body

    const updatedCategory = await categoryModel.findByIdAndUpdate({_id : id}, { href, title })
    if(!updatedCategory){
        return res.status(404).json({message : "category not found"})
    }

    return res.json(updatedCategory)




}
exports.delete = async (req, res) => {
    const { id } = req.params

    const isValidID = await mongoose.Types.ObjectId.isValid(id)



    if (!isValidID) {
        return res.status(405).json({ message: 'id is not valid' })
    }

    const removedCategory = await categoryModel.findByIdAndDelete({ _id: id })

    return res.json(removedCategory)

}

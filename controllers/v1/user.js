const userModel = require('./../../models/user')
const BanUserModel = require('./../../models/ban-phone')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const express = require('express')


exports.banUser = async (req, res) => {
    const mainUser = await userModel.findOne({ _id: req.params.id }).lean()
    const banUserResult = await BanUserModel.create({ phone: mainUser.phone })

    if (banUserResult) {
        return res.status(200).json({ message: "user baned succersfully." })
    }

    return res.status(500).json({ message: "server error" })
}

exports.getAll = async (req, res) => {
    const users = await userModel.find({}).select('-password')
    res.json(users)
}

exports.deleteUser = async (req, res) => {

    const isUserIDValid = mongoose.Types.ObjectId.isValid(req.params.id)

    if (!isUserIDValid) {
        return res.status(409).json({ message: 'user id is not valid' })
    }

    const deletedUser = await userModel.deleteOne({ _id: req.params.id }).lean()

    if (deletedUser.deletedCount > 0) {
        return res.json({ message: 'user has been deleted succesfully.' })
    }

    return res.status(404).json({ message: 'server error' })

}

exports.changeRole = async (req, res) => {

    const { id } = req.body

    const isUserIDValid = mongoose.Types.ObjectId.isValid(id)

    if (!isUserIDValid) {
        return res.status(409).json({ message: 'user id is not valid' })
    }

    const user = await userModel.findById(id)

    let newRole = user.role === 'ADMIN' ? 'USER' : 'ADMIN'

    const updatedUser = await userModel.findByIdAndUpdate(id,{role : newRole})

    res.json({message : "user role changed succesfully."})
}

exports.updateUser = async (req , res)=>{

    const { email , name , username , password , phone } = req.body

    const hashedPasswrod = bcrypt.hashSync(password,10)

    const user = await userModel.findByIdAndUpdate(req.user._id , {
        phone , username , name , password : hashedPasswrod , email 
    }).select('-password')

    return res.json(user)

}

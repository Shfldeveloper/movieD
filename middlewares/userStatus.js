const jwt = require('jsonwebtoken')

const userModel = require('../models/user')

module.exports = async (req, res, next) => {
    const authHeader = req.header('Authorization')?.split(" ");
    if (authHeader?.length !== 2) {
        
        req.user = false

        next()
    }

    const token = authHeader[1]

    try{

        const jwtPayload = jwt.verify(token, process.env.JWP_SECRETKEY)

        
        const user = await userModel.findOne({ _id: jwtPayload.id }).lean()
        

        Reflect.deleteProperty(user, 'password')

        req.user = user

        next()

    } 
    catch (error) {

        return res.status(500).json(error)
    }
}
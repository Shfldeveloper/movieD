const userModel = require("../../models/user")
const BaneduserModel = require("../../models/ban-phone")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const registerValidator = require('../../validators/register')


exports.register = async (req, res) => {
    const validationResult = registerValidator(req.body)
    if (validationResult != true) {
        return res.status(422).json(validationResult)
    }

    const { username, email, name, phone, password } = req.body

    const isUserExist = await userModel.findOne({
        $or: [{ email }, { username }]
    })

    if (isUserExist) {
        return res.status(409).json({ message: "email or username has taken before" })
    }

    const hashedPassword = bcrypt.hashSync(password, 10)

    const isUserBaned = await BaneduserModel.findOne({ phone })

    if (isUserBaned) {
        return res.status(409).json({ message: "the user is banned" })
    }

    const countOfUsers = await userModel.countDocuments();

    const user = await userModel.create({
        email, username, name, password: hashedPassword, phone,
        role: countOfUsers > 0 ? "USER" : "ADMIN",

    })

    const accesToken = jwt.sign({ id: user._id }, process.env.JWP_SECRETKEY, { expiresIn: "35 day" })

    const plainUser = user.toJSON()
    delete plainUser.password
    // ------another way of deleting password from response------
    // const userObject = user.toObject()
    // Reflect.deleteProperty(userObject,password)


    return res.status(201).json({ plainUser, accesToken })


}

exports.login = async (req, res) => {
    const { identifier, password } = req.body

    const user = await userModel.findOne({
        $or: [{ email: identifier }, { username: identifier }]
    })

    if (!user) {
        return res.status(401).json({ message: "there is no user with this username or email" })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return res.status(401).json({ message: "password is not valid" })
    }

    const accesToken = jwt.sign({ id: user._id }, process.env.JWP_SECRETKEY, {
        expiresIn: "30 day"
    })

    return res.status(200).json({accesToken : `${accesToken}`})
}

exports.getMe = async (req, res) => {

}
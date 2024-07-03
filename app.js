const express = require('express')
const cors = require('cors')
const path = require('path')
const bodyParser = require("body-parser")
const app = express()
const authRouter = require("./routes/v1/auth")
const usersRouter = require('./routes/v1/user')
const categoriesRouter = require('./routes/v1/category')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))


app.use('/movies/covers',express.static(path.join(__dirname, "public","movies","covers")))
app.use('/v1/auth',authRouter)
app.use('/v1/users',usersRouter)
app.use('/v1/category',categoriesRouter)

module.exports = app;




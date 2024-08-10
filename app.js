const express = require('express')
const cors = require('cors')
const path = require('path')
const bodyParser = require("body-parser")
const app = express()
const authRouter = require("./routes/v1/auth")
const usersRouter = require('./routes/v1/user')
const categoriesRouter = require('./routes/v1/category')
const movieRouter = require('./routes/v1/movie')
const commentRouter = require('./routes/v1/comment')
const subscriptionRouter = require('./routes/v1/subscription')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))


app.use('/movies/covers',express.static(path.join(__dirname, "public","movies","covers")))
app.use('/v1/movies',movieRouter)
app.use('/v1/auth',authRouter)
app.use('/v1/users',usersRouter)
app.use('/v1/category',categoriesRouter)
app.use('/v1/comment',commentRouter)
app.use('/v1/subscription',subscriptionRouter)

module.exports = app;




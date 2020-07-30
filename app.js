const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')

const usersRouter = require('./controllers/UserController')
const blogsRouter = require('./controllers/BlogController')
const loginRouter = require('./controllers/LoginController')
const middleware = require('./utils/middleware')

console.log('Connecting to mongoDB...')

mongoose.set("useCreateIndex", true);

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB.')
    })
    .catch((error) => {
        console.log('Error connectingo to MongoDB: ', error.message)
    })

app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.json())
app.use(middleware.requestLogger)

app.use(middleware.tokenExtractor)

app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
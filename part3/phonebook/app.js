require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const personRouter = require('./controllers/person')
const middleware = require('./utils/middleware')

// parses incoming requests that have JSON payloads
app.use(express.json())

// serves build version of create react app
app.use(express.static('build'))

app.use(middleware.requestLogger)

app.use(cors())

app.use('/api/persons', personRouter)

// handler of requests with unknown endpoint
app.use(middleware.unknownEndpoint)

// handler of requests with result to errors
app.use(middleware.errorHandler)

module.exports = app

require('dotenv').config()

const express = require('express')
const helmet = require('helmet')
const bodyParser = require('body-parser')

import { router as routes } from './routes/routes'

import errorHandlers from './services/errors/errorHandlers'

//eslint-disable-next-line
const port = process.env.PORT || 3000

const app = express()

app.use(helmet())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('public'))

app.use('/chart-machine', routes)

//Catch 404-errors
app.use(errorHandlers.pageNotFound);

//Global error handler
app.use(errorHandlers.globalErrorHandler);

app.listen(port, () => console.log(`chart-machine is listening on port ${port}!`))

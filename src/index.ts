if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const helmet = require('helmet')
const bodyParser = require('body-parser')

const cookieSession = require('cookie-session')

const passport = require('passport')

import { router as routes } from './routes/routes'

import errorHandlers from './services/errors/errorHandlers'

import config from './config/config'
;(global as any).__basedir = __dirname

//eslint-disable-next-line
const port = process.env.PORT || 3000

const app = express()

app.use(helmet())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cookieSession({ keys: ['key1', 'key2'] }))

app.use(passport.initialize())
app.use(passport.session())
app.use(require('./routes/login/oauth2').router)

app.use('/', routes)
app.use(express.static(__dirname + '/public'))

//Catch 404-errors
app.use(errorHandlers.pageNotFound)

//Global error handler
app.use(errorHandlers.globalErrorHandler)

app.listen(port, () =>
  console.log(`chart-machine is listening on port ${port}!`)
)

console.log('node-env:', process.env.NODE_ENV)

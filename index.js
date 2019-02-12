require('dotenv').config();

const http = require('http');
const fs = require('fs');

const express = require('express');

const helmet = require('helmet')
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

const routes = require('./routes/routes')

const app = express();


app.use(helmet())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('public'))

app.use('/chart-machine', routes)

app.listen(port, () => console.log(`chart-machine is listening on port ${port}!`));

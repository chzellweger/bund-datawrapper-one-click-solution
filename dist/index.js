"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const routes_1 = require("./routes/routes");
const errorHandlers_1 = require("./services/errors/errorHandlers");
//eslint-disable-next-line
const port = process.env.PORT || 3000;
const app = express();
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use('/chart-machine', routes_1.router);
//Catch 404-errors
app.use(errorHandlers_1.default.pageNotFound);
//Global error handler
app.use(errorHandlers_1.default.globalErrorHandler);
app.listen(port, () => console.log(`chart-machine is listening on port ${port}!`));
//# sourceMappingURL=index.js.map
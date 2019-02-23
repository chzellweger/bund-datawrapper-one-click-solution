"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Catch 404 errors
function pageNotFound(req, res, next) {
    console.log(req.url);
    const err = new Error(`Not Found: ${req.url}`);
    //err.status = 404;
    next(err);
}
//Global error handler
//eslint-disable-next-line
function globalErrorHandler(error, req, res, next) {
    console.log(error);
    //res.status(error.status || 500);
    res.status(500).send(`<pre>${error.message || 'Something went wrong.'}. <a href="/">Return to homepage</a></pre>`);
}
exports.default = {
    globalErrorHandler,
    pageNotFound
};
//# sourceMappingURL=errorHandlers.js.map
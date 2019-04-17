import { Request, Response, NextFunction } from 'express'

//Catch 404 errors
function pageNotFound(req: Request, res: Response, next: NextFunction) {
  console.log(req.url)
  const err = new Error(`Not Found: ${req.url}`)
  //err.status = 404;
  next(err)
}

//Global error handler
//eslint-disable-next-line
function globalErrorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(error)
  //res.status(error.status || 500);
  res
    .status(500)
    .send(
      `<pre>${error.message ||
        'Something went wrong.'}. <a href="/">Return to homepage</a></pre>`
    )
}

export default {
  globalErrorHandler,
  pageNotFound
}

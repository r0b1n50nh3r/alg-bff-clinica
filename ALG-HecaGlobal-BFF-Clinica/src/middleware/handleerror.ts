import { NextFunction, Request, Response } from 'express';
import createError from 'http-errors'


export const error404Handler = (next: NextFunction) => {
  next(createError(404));
};

// eslint-disable-next-line
export const errorHandler = (err: Error, req: Request, res: Response) => {
  // set locals, only providing error in development
  res.locals.message = req;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(res.statusCode || 500);
  res.send({ message: req });
};
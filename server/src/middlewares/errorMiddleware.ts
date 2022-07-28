import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const statusCode: number = res.statusCode || 500;
  res.status(statusCode);

  let { message, stack } = err;
  res.json({
    message,
    ...(process.env.NODE_ENV !== "production" && { stack }),
  });

  next();
};

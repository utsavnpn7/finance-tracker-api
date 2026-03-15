import { Request, Response, NextFunction } from "express";

const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  console.error("Error: ${error.message}");
  res.status(500).json({
    message: error.message || "Internal Server Error",
  });
};
export default errorMiddleware;

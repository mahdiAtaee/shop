import { Application, NextFunction, Request, Response } from "express";

export default function ExceptionHandler(app: Application) {
  app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(403).send({
      statusCode: 403,
      error: true,
      message: error.message,
    });
  });
}

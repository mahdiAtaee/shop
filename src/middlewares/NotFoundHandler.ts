import { Application, NextFunction, Request, Response } from "express";

export default function NotFoundHandler(app: Application) {
  app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    console.log("in notfoundhandler",error);
    
    res.status(404).send({
      statusCode: 404,
      error: true,
      message: "Requested Recourse could not be found on this server!",
    });
  });
}

import * as cors from "cors";
import * as bodyParser from "body-parser";
import { Application } from "express";

export default function boot(app: Application) {
  app.use(cors());
  app.use(bodyParser.json());
}

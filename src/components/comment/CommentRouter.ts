import { Router } from "express";
import Controller from "./CommentController.js";
const CommentController = new Controller();
const router: Router = Router();

export default router;

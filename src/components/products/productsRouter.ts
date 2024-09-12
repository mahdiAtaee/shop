import { Router } from "express";
import ProductController from "./productsController";
const productControllerInstance = new ProductController();
const productRouter: Router = Router();

productRouter.get("/", productControllerInstance.index);

export default productRouter
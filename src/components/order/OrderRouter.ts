import { Router } from "express";
import Controller from './OrderController'
const orderController = new Controller()
const router: Router = Router()

router.get('/', orderController.index)

export default router


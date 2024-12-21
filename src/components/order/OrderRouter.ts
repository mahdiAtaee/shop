import { Router } from "express";
import Controller from './OrderController'
const orderController = new Controller()
const router: Router = Router()

export default router


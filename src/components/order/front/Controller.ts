import { NextFunction, Request, Response } from "express";
import OrderService from "../services/orderService";
import IOrderRepository from "../repositories/IOrderRepository";
import OrderMongoRepository from "../repositories/OrderMongoRepository";
import { verify } from '../../../services/JWTService'
import ServerException from "../../exceptions/ServerException";

export default class Controller {
    private readonly orderService: OrderService
    private readonly orderRepository: IOrderRepository
    constructor() {
        this.orderRepository = new OrderMongoRepository()
        this.orderService = new OrderService()
        this.store = this.store.bind(this)
    }
    public async store(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = await verify(req.headers.authorization as string)
                        
            const orderData = {
                userID: id,
                items: [...req.body.basket],
                deliveryAddress: req.body.delivery_address,
                coupon: req.body.coupon
            }

            const newOrder = await this.orderService.addOrder(orderData)
            
            if (!newOrder) {
                throw new ServerException('در حال حاضر نمی توان سفارش جدید اضافه کرد')
            }
            res.send({
                success: true
            })
        } catch (error) {
            next(error)
        }
    }
}
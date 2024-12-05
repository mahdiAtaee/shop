import { Request, Response } from "express";
import OrderMongoRepository from "./repositories/OrderMongoRepository";

class OrderController {
  private readonly OrderRepository: OrderMongoRepository;
  constructor() {
    this.OrderRepository = new OrderMongoRepository();
  }

  public async index(req: Request, res: Response): Promise<void> {
    const orders = this.OrderRepository.findMany({});
    res.send({ orders });
  }
}

export default OrderController;

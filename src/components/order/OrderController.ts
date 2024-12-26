import { Request, Response } from "express";
import OrderMongoRepository from "./repositories/OrderMongoRepository";
import OrderTransformer from './OrderTransformer'

class OrderController {
  private readonly OrderRepository: OrderMongoRepository;
  private readonly Transformer: OrderTransformer;
  constructor() {
    this.OrderRepository = new OrderMongoRepository();
    this.Transformer = new OrderTransformer()
    this.index = this.index.bind(this)
  }

  public async index(req: Request, res: Response): Promise<void> {
    const orders = await this.OrderRepository.findMany({}, ["user"]);
    const finalOrders = await this.Transformer.collection(orders)
    res.send({ finalOrders });
  }
}

export default OrderController;

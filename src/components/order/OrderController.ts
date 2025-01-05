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
    const perPage = 3
    const page = req.query.page || 1
    const offset = Math.ceil((page as unknown as number) - 1 / perPage)
    const orders = await this.OrderRepository.findMany({
      user: req.query.keyword as string,
    }, ["user"], {
      perPage,
      offset
    });
    const totalOrders = await this.OrderRepository.findMany({
      user: req.query.keyword as string,
    })
    const finalOrders = await this.Transformer.collection(orders)
    res.send({
      data: finalOrders,
      _metadata: {
        perPage,
        page,
        totalPages: Math.ceil(totalOrders.length / perPage),
        totalItems: totalOrders.length
      }
    });
  }
}

export default OrderController;

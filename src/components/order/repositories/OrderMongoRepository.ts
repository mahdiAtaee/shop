import OrderStatus from "../model/OrderStatus";
import IOrderRepository from "./IOrderRepository";
import OrderModel from "../model/Order";
import IOrder from "../model/IOrder";
import { FilterQuery } from "mongoose";

export default class OrderMongoRepository implements IOrderRepository {
  public async findByStatus(status: OrderStatus): Promise<IOrder[]> {
    return OrderModel.find({ status });
  }
  public async findOne(ID: string): Promise<IOrder | null> {
    return OrderModel.findById(ID);
  }
  public async findMany(params: any): Promise<IOrder[]> {
    return OrderModel.find(params);
  }
  public async create(params: any): Promise<IOrder> {
    const newOrder = new OrderModel({ ...params });
    return newOrder.save();
  }
  public async updateOne(
    where: FilterQuery<IOrder>,
    updateData: Partial<IOrder>
  ): Promise<boolean> {
    const Order = await OrderModel.updateOne(where, updateData);
    if (Order) {
      return true;
    }
    return false;
  }
  public async updateMany(where: any, params: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
  public async deleteOne(ID: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
  public async deleteMany(where: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
}

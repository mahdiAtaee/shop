import PaymentStatus from "../model/PaymentStatus";
import IPaymentRepository from "./IPaymentRepository";
import PaymentModel from "../model/Payment";
import IPayment from "../model/IPayment";
import { FilterQuery } from "mongoose";

export default class PaymentMongoRepository implements IPaymentRepository {
  public async findOne(ID: string): Promise<IPayment | null> {
    return PaymentModel.findById(ID);
  }
  public async findMany(params: any): Promise<IPayment[]> {
    return PaymentModel.find(params);
  }
  public async create(params: any): Promise<IPayment> {
    const newPayment = new PaymentModel({ ...params });
    return newPayment.save();
  }
  public async updateOne(
    where: FilterQuery<IPayment>,
    updateData: Partial<IPayment>
  ): Promise<boolean> {
    const Payment = await PaymentModel.updateOne(where, updateData);
    if (Payment) {
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

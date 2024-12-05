import { Document } from "mongoose";
import IAddress from "src/components/users/model/IAddress";
import IOrderLine from "./IOrderLine";

export default interface IOrder extends Document {
  user: object;
  total_price: number;
  discountedPrice: number
  final_price: number;
  coupon: object;
  deliveryAddress: IAddress;
  orderLines: IOrderLine[];
  created_at: Date;
  updated_at: Date;
  status: OrderStatus;
}

import { Document } from "mongoose";

export default interface IOrder extends Document {
  user: object;
  total_price: number;
  coupon: object;
  final_price: number;
  status: OrderStatus;
  order_line: [object];
  created_at: Date;
  updated_at: Date;
}

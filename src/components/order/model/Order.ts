import { model, Schema } from "mongoose";
import IOrder from "./IOrder";
import orderLineSchema from "./OrderLine";

const orderSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  total_price: { type: Number, required: true },
  coupon: { type: Object, default: null },
  final_price: { type: Number, required: true },
  status: { type: OrderStatus, default: OrderStatus.INIT },
  order_line: { type: [orderLineSchema] },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export default model<IOrder>("Order", orderSchema);

import { Schema, model } from "mongoose";
import PaymentStatus from "./PaymentStatus";
import IPayment from "./IPayment";

const paymentSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  order: { type: Schema.Types.ObjectId, ref: "Order", required: true },
  amount: { type: Number, required: true },
  reserve: { type: String, required: true },
  reference: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  status: {
    type: PaymentStatus,
    default: PaymentStatus.PENDING,
    required: true,
  },
});

export default model<IPayment>("Payment", paymentSchema);

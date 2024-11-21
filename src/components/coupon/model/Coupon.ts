import { model, Schema } from "mongoose";
import ICoupon from "./ICoupon";
import CouponStatus from "./CouponStatus";

const couponSchema: Schema = new Schema({
  code: { type: String, required: true },
  amount: { type: Number, required: true },
  limit: { type: Number, default: 0 },
  used: { type: Number, default: 0 },
  expired_at: { type: Date, default: null },
  constraints: { type: Object, required: true },
  status: { type: CouponStatus, default: CouponStatus.ACTIVE },
});

export default model<ICoupon>("Coupon", couponSchema);

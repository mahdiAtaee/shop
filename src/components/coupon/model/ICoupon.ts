import { Document } from "mongoose";
import CouponStatus from "./CouponStatus";

export default interface ICoupon extends Document {
  code: string;
  amount: number;
  limit: number;
  used: number;
  expired_at: Date;
  constraints: Object;
  status: CouponStatus;
}

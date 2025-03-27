import CouponStatus from "./CouponStatus";

export default interface ICoupon {
    code: string;
    percent: number;
    limit: number;
    used: number;
    expires_at: Date;
    constraints: Object;
    status: CouponStatus;
}
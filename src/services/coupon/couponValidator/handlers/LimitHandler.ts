import ICoupon from "src/components/coupon/model/ICoupon";
import IUser from "src/components/users/model/IUser";
import AbstractCouponHandler from "../AbstractCouponHandler";

class LimitHandler extends AbstractCouponHandler {
  public process(user: IUser, coupon: ICoupon): ICoupon | null {
    if (coupon.used >= coupon.limit) {
      throw new Error("تعداد استفاده از این کد تخفیف به اتمام رسیده است");
    }
    return super.process(user, coupon);
  }
}

export default LimitHandler;

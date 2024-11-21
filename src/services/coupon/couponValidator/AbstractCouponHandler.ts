import IUser from "src/components/users/model/IUser";
import CouponHandler from "./CouponHandler";
import ICoupon from "src/components/coupon/model/ICoupon";

abstract class AbstractCouponHandler implements CouponHandler {
  private nextHandler: CouponHandler;

  public setNext(Handler: CouponHandler): CouponHandler {
    this.nextHandler = Handler;
    return Handler;
  }
  public process(user: IUser, coupon: ICoupon): ICoupon | null {
    if (this.nextHandler) {
      return this.nextHandler.process(user, coupon);
    }
    return null;
  }
}
export default AbstractCouponHandler;

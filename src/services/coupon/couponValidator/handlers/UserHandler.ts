import ICoupon from "src/components/coupon/model/ICoupon";
import IUser from "src/components/users/model/IUser";
import AbstractCouponHandler from "../AbstractCouponHandler";

class UserHandler extends AbstractCouponHandler {
  public process(user: IUser, coupon: ICoupon): ICoupon | null {
    const { userConstriant } = coupon.constraints;
    if (user.id !== userConstriant.id) {
      throw new Error("این کد تخفیف مربوط به شخص دیگری است");
    }
    return super.process(user, coupon);
  }
}
export default UserHandler;

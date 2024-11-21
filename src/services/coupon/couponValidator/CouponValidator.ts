import ICoupon from "src/components/coupon/model/ICoupon";
import IUser from "src/components/users/model/IUser";
import UserHandler from "./handlers/UserHandler";
import LimitHandler from "./handlers/LimitHandler";
import ExpireHandler from "./handlers/ExpireHandler";

class CouponValidator {
  public Handle(user: IUser, coupon: ICoupon) {
    const userHandler = new UserHandler();
    const limitHandler = new LimitHandler();
    const expireHandler = new ExpireHandler();
    userHandler.setNext(limitHandler).setNext(expireHandler);
    return userHandler.process(user, coupon);
  }
}

export default CouponValidator;

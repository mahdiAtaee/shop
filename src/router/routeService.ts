import { Application, Router } from "express";
import RouteEngine from "./router";
import usersRouter from "../components/users/usersRouter";
import productAdminRouter from "../components/product/admin/Router";
import productRouter from "../components/product/front/Router";
import CategoryRouter from "../components/category/CategoryRouter";
import OrderRouter from "../components/order/OrderRouter"
import PaymentRouter from "../components/payment/PaymentRouter"
import CouponAdminRouter from '../components/coupon/admin/CouponRouter'
import CouponRouter from '../components/coupon/front/Router'
import authRouter from '../components/auth/authRouter'
class RouteService {
  public app: Application;
  private router: RouteEngine;

  constructor(app: Application) {
    this.app = app;
    this.router = new RouteEngine();
    this.bindRouter();
  }

  public bindRouter() {
    //admin
    this.router.registerRouter("/api/v1/admin/products", productAdminRouter);
    this.router.registerRouter("/api/v1/admin/coupons", CouponAdminRouter)

    //front
    this.router.registerRouter("/api/v1/products", productRouter);
    this.router.registerRouter("/api/v1/auth", authRouter)
    this.router.registerRouter("/api/v1/users", usersRouter);
    this.router.registerRouter("/api/v1/categories", CategoryRouter)
    this.router.registerRouter("/api/v1/orders", OrderRouter)
    this.router.registerRouter("/api/v1/payments", PaymentRouter)
    this.router.registerRouter("/api/v1/coupons", CouponRouter)
  }

  public run() {
    this.router.getRouters().forEach((router: Router, route: string) => {
      this.app.use(route, router);
    });
  }
}

export default RouteService;

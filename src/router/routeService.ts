import { Application, Router } from "express";
import RouteEngine from "./router";
import usersRouter from "../components/users/usersRouter";
import productRouter from "../components/products/productsRouter";

class RouteService {
  public app: Application;
  private router: RouteEngine;

  constructor(app: Application) {
    this.app = app;
    this.router = new RouteEngine();
    this.bindRouter();
  }

  public bindRouter() {
    this.router.registerRouter("/api/v1/users", usersRouter);
    this.router.registerRouter("/api/v1/products", productRouter);
  }

  public run() {
    this.router.getRouters().forEach((router: Router, route: string) => {
      this.app.use(route, router);
    });
  }
}

export default RouteService;

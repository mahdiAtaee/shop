import * as express from "express";
import { Application } from "express";
import Router from "./router/router";
import RouteService from "./router/routeService";
import boot from "./boot";

class App {
  public app: Application;
  public port: number;
  private router: RouteService;
  constructor(port: number) {
    this.app = express();
    this.port = port;
    this.router = new RouteService(this.app);
  }
  public start() {
    boot(this.app);
    this.router.run();
    this.app.listen(this.port, () => {
      console.log("app is runnig on port", this.port);
    });
  }
}

export default App;

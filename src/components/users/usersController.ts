import { Request, Response } from "express";
import User from "./model/User";

class UsersController {
  public index(req: Request, res: Response) {
    res.send({ allUsers: [] });
  }
  public async create(req: Request, res: Response) {
    const newUser = await User.create({
      first_name: "mahdi",
      last_name: "ataee",
      mobile: "09301234567",
      email: "Mahdi@gmail.com",
    });
    res.send({
      User: newUser,
    });
  }
}

export default UsersController;

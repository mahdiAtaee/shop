import { Request, Response } from "express";
import Category from "./model/Category";

class CategoryController {
  constructor() {}

  public async store(req: Request, res: Response) {
    const newCategory = await Category.create({ ...req.body });
    return res.send({ success: true, newCategory });
  }

  public async list(req: Request, res: Response) {
    const category = await Category.find();
    return res.send(category);
  }

  public async attributes(req: Request, res: Response) {
    const categoryID = req.params.id;
    const category = await Category.findById(categoryID);
    res.send(
      category?.groups.map((group) => {
        return {
          title: group.title,
          attributes: group.attributes,
        };
      })
    );
  }
}

export default CategoryController;

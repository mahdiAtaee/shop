import { NextFunction, Request, Response } from "express";
import Category from "../model/Category";
import IRepository from "../../contracts/IRepository";
import ICategory from "../model/ICategory";
import CategoryMongoRepository from "../repositories/CategoryMongoRepository";
import ICategoryRepository from "../repositories/ICategoryRepository";
import CategoryTransformer from "./CategoryTransformer";
import ITransformer from "../../contracts/ITransformer";

class CategoryController {
  private readonly categoryRepository: ICategoryRepository
  private readonly categoryTransformer: ITransformer<ICategory>
  constructor() {
    this.categoryRepository = new CategoryMongoRepository()
    this.categoryTransformer = new CategoryTransformer()
    this.parentList = this.parentList.bind(this)
    this.list = this.list.bind(this)
  }

  public async store(req: Request, res: Response, next: NextFunction) {
    try {
      const newCategory = await Category.create({ ...req.body });
      return res.send({ success: true, newCategory });
    } catch (error) {
      next(error)
    }
  }

  public async list(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await Category.find();
      return res.send({
        success: true,
        categories: this.categoryTransformer.collection(categories)
      });
    } catch (error) {
      next(error)
    }
  }

  public async attributes(req: Request, res: Response) {
    const categoryID = req.params.id;
    const category = await Category.findById(categoryID);
    res.send(
      category?.filterGroups.map((group) => {
        return {
          title: group.name,
          attributes: group.filters,
        };
      })
    );
  }

  public async parentList(req: Request, res: Response, next: NextFunction) {
    try {
      const categoryLevel = req.query.level
      const categories = await this.categoryRepository.findByLevel(categoryLevel as string)
      res.send({
        success: true,
        categories
      })
    } catch (error) {
      next(error)
    }
  }
}

export default CategoryController;

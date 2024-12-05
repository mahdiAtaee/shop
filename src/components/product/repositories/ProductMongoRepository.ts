import ProductStatus from "../model/productStatus";
import IProductRepository from "./IProductRepository";
import ProductModel from "../model/Product";
import IProducts from "../model/IProduct";
import { FilterQuery } from "mongoose";

export default class ProductMongoRepository implements IProductRepository {
  public async findByStatus(status: ProductStatus): Promise<IProducts[]> {
    return ProductModel.find({ status });
  }
  public async findOne(ID: string): Promise<IProducts | null> {
    return ProductModel.findById(ID);
  }
  public async findMany(params: any): Promise<IProducts[]> {
    return ProductModel.find(params);
  }
  public async create(params: any): Promise<IProducts> {
    const newProduct = new ProductModel({ ...params });
    return newProduct.save();
  }
  public async updateOne(
    where: FilterQuery<IProducts>,
    updateData: Partial<IProducts>
  ): Promise<boolean> {
    const product = await ProductModel.updateOne(where, updateData);
    if (product) {
      return true;
    }
    return false;
  }
  public async updateMany(where: any, params: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
  public async deleteOne(ID: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
  public async deleteMany(where: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
}

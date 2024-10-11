import { Document } from "mongoose";
import IProductAttribute from "./IProductAttribute";

export default interface IProductCategory extends Document {
  title: string;
  total_products: number;
  attributes: IProductAttribute;
}

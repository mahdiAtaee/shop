import { model, Schema } from "mongoose";
import IProductCategory from "./IProductCategory";

const productCategory: Schema = new Schema({
  title: { type: String, required: true },
  total_product: { type: Number, default: 0 },
  attributes: { type: [Object] },
});

export default model<IProductCategory>("ProductCategory", productCategory);

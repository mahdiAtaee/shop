import { model, Schema } from "mongoose";
import IProducts from "./IProducts";
import ProductStatus from "./productStatus";

const ProductSchema: Schema = new Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  sale_price: { type: Number, default: 0 },
  thumbnail: { type: String },
  gallery: { type: [String] },
  product_category: { type: Schema.Types.ObjectId, ref: "ProductCategory" },
  attributes: { type: [Object], required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  status: { type: ProductStatus, default: ProductStatus.INIT },
});

export default model<IProducts>("Products", ProductSchema);

import { model, Schema } from "mongoose";
import IProducts from "./IProduct";
import ProductStatus from "./productStatus";

const ProductSchema: Schema = new Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  discountedPrice: { type: Number, default: 0 },
  thumbnail: { type: String },
  gallery: { type: [String] },
  category: { type: Schema.Types.ObjectId, ref: "ProductCategory" },
  attributes: { type: [Object], required: true },
  variation: { type: [Object] },
  priceVariation: { type: [Object] },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  status: { type: String, enum: ProductStatus, default: ProductStatus.INIT },
});

ProductSchema.virtual('thumbnailUrl').get(function (this:IProducts) {
  return `${process.env.APP_URL}/contents/${this.thumbnail}`
})


ProductSchema.virtual('galleryUrl').get(function (this:IProducts) {
  return this.gallery?.map((item:string) => {
    return `${process.env.APP_URL}/contents/${item}`
  })
})

export default model<IProducts>("Product", ProductSchema);

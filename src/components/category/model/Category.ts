import { model, Schema } from "mongoose";
import ICategory from "./ICategory";

const CategorySchema: Schema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, require: true },
  groups: { type: [Object] },
});
CategorySchema.set("toJSON", {
  virtuals: true,
});

export default model<ICategory>("Categories", CategorySchema);

import { Schema, model } from "mongoose";
import { TCategory } from "./category.interface";

export const categorySchema = new Schema<TCategory>({
  name: {
    type: String,
    required: [true, "Category name is required"],
    unique: true,
  },
});

export const categoryModel = model<TCategory>("category", categorySchema);

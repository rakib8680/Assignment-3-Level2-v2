import { TCategory } from "./category.interface";
import { CategoryModel } from "./category.model";

// create category
const createCategory = async (payload: TCategory) => {
  const result = await CategoryModel.create(payload);
  return result;
};

export const CategoryService = {
  createCategory,
};

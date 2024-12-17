import { Request, Response } from "express";
import { CategoryService } from "./category.service";

// create category
const createCategory = async (req: Request, res: Response) => {
  const categoryData = req.body;
  const result = await CategoryService.createCategory(categoryData);
  res.status(201).json({
    success: true,
    statusCode: 201,
    message: "Category created successfully",
    data: result,
  });
};

export const CategoryController = {
  createCategory,
};

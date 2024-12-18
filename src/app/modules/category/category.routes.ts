import { Router } from "express";
import { CategoryController } from "./category.controller";

const router = Router();

router.get("/all-categories", CategoryController.getAllCategories);
router.post("/create-category", CategoryController.createCategory);

export const CategoryRoutes = router;

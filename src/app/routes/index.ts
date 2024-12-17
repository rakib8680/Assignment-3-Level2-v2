import { Router } from "express";
import { CourseRoutes } from "../modules/course/course.routes";
import { CategoryRoutes } from "../modules/category/category.routes";

const router = Router();

const moduleRoues = [
  {
    path: "/course",
    route: CourseRoutes,
  },
  {
    path: "/category",
    route: CategoryRoutes,
  },
];

moduleRoues.forEach((route) => router.use(route.path, route.route));

export default router;

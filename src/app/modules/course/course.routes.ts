import { Router } from "express";
import { CourseController } from "./course.controller";

const router = Router();


router.get('/all-courses', CourseController.getAllCourses)
router.post('/create-course', CourseController.createCourse)



export const CourseRoutes = router;
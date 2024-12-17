import { Request, Response } from "express";
import { CourseServices } from "./course.service";

// create a course
const createCourse = async (req: Request, res: Response) => {
  const courseData = req.body;
  const result = await CourseServices.createCourse(courseData);

  res.status(201).json({
    success: true,
    statusCode: 201,
    message: "Course created successfully",
    data: result,
  });
};

export const CourseController = {
  createCourse,
};

import { CourseServices } from "./course.service";
import catchAsync from "../../utils/catchAsync";

// create a course
const createCourse = catchAsync(async (req, res) => {
  const courseData = req.body;
  const result = await CourseServices.createCourse(courseData);

  res.status(201).json({
    success: true,
    statusCode: 201,
    message: "Course created successfully",
    data: result,
  });
});

// get all courses
const getAllCourses = catchAsync(async (req, res) => {
  const result = await CourseServices.getAllCourses();

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Courses fetched successfully",
    data: result,
  });
});

// update course
const updateCourse = catchAsync(async (req, res) => {
  const courseId = req.params.id;
  const updatableData = req.body;
  const result = await CourseServices.updateCourse(courseId, updatableData);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Course updated successfully",
    data: result,
  });
});

export const CourseController = {
  createCourse,
  getAllCourses,
  updateCourse,
};

import { TCourse } from "./course.interface";
import { CourseModel } from "./course.model";

// create a course
const createCourse = async (payload: TCourse) => {
  const result = await CourseModel.create(payload);
  return result;
};

// get all courses
const getAllCourses = async () => {
  const result = await CourseModel.find();
  return result;
};

// update course
const updateCourse = async (id: string, payload: Partial<TCourse>) => {
  const result = await CourseModel.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return result;
};

export const CourseServices = {
  createCourse,
  getAllCourses,
  updateCourse,
};

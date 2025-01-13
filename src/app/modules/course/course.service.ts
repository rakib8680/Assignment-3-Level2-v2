import QueryBuilder from "../../helpers/queryBuilder";
import { courseSearchableFields } from "./course.constant";
import { TCourse } from "./course.interface";
import { CourseModel } from "./course.model";

// create a course
const createCourse = async (payload: TCourse) => {
  const result = await CourseModel.create(payload);
  return result;
};

// get all courses
const getAllCourses = async (query: Record<string, unknown>) => {

  // console.log(query);
  // const sortBy = query.sort as string;
  // const sortOrder = query.sortOrder as string;
  // const sortOptions = `${sortOrder === 'asc' ? '' : '-'}${sortBy}`;
  // const result = await CourseModel.find().populate('categoryId').sort(sortOptions);
  const courseQuery = new QueryBuilder(
    CourseModel.find().populate("categoryId"),
    query
  )
    .search(courseSearchableFields)
    .filter()
    .filterPrice()
    .sort()
    .paginate()

  const result = await courseQuery.modelQuery;
  const meta = await courseQuery.countTotal();

  return {
    meta,
    result,
  };
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

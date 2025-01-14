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
  const courseQuery = new QueryBuilder(
    CourseModel.find().populate("categoryId"),
    query
  )
    .search(courseSearchableFields)
    .filter()
    .filterPrice()
    .sort()
    .paginate()
    .fields();

  const result = await courseQuery.modelQuery;
  const meta = await courseQuery.countTotal();

  return {
    meta,
    result,
  };
};









// update course
const updateCourse = async (id: string, payload: Partial<TCourse>) => {
  const {tags,details, ...remainingCourseData} = payload;


  const modifiedUpdatableData : Record<string, unknown> = {...remainingCourseData};

//  update details 
  if(details && Object.keys(details).length){
    for(const [key,value] of Object.entries(details)){
        modifiedUpdatableData[`details.${key}`] = value;
    }
  }


  const result = await CourseModel.findByIdAndUpdate(id, modifiedUpdatableData, {
    new: true,
  });

  return result;
};









export const CourseServices = {
  createCourse,
  getAllCourses,
  updateCourse,
};

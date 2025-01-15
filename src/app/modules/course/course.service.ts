import status from "http-status";
import AppError from "../../errors/AppError";
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

  // separate non-primitive fields from payload
  const {tags,details, ...remainingCourseData} = payload;

  // update primitive data 
  const updatePrimitiveData = await CourseModel.findByIdAndUpdate(id, remainingCourseData, {
    new: true,
    runValidators: true,
  })



  const modifiedUpdatableData : Record<string, unknown> = {};
//  update details 
  if(details && Object.keys(details).length){
    for(const [key,value] of Object.entries(details)){
        modifiedUpdatableData[`details.${key}`] = value;
    }
  };



  // update tags
  if(tags && tags.length){
    // filter out the deletable tags
    const deletableTags = tags.filter((tag)=>tag.name && tag.isDeleted).map(tag =>tag.name);
    
    const deleteTagsFromCourse = await CourseModel.findByIdAndUpdate(id,{
      $pull:{
        tags:{
          name:{
            $in : deletableTags
          }
        }
      }
    })

    if(!deleteTagsFromCourse){
      throw new AppError(status.BAD_REQUEST,"failed to remove tags")
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

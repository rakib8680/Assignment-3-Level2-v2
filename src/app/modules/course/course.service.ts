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
  const { tags, details, ...remainingCourseData } = payload;

  // update primitive data
  await CourseModel.findByIdAndUpdate(id, remainingCourseData, {
    new: true,
    runValidators: true,
  });

  //  update details
  const modifiedUpdatableData: Record<string, unknown> = {};
  if (details && Object.keys(details).length) {
    for (const [key, value] of Object.entries(details)) {
      modifiedUpdatableData[`details.${key}`] = value;
    }
  }
  await CourseModel.findByIdAndUpdate(id, modifiedUpdatableData, {
    new: true,
    runValidators: true,
  });

  // update tags
  if (tags && tags.length) {
    // filter out the deletable tags and remove them from the course
    const deletableTags = tags
      .filter((tag) => tag.name && tag.isDeleted)
      .map((tag) => tag.name);

    await CourseModel.findByIdAndUpdate(id, {
      $pull: {
        tags: {
          name: {
            $in: deletableTags,
          },
        },
      },
    });

    // filter out the new tags and add them to the course
    const newTags = tags.filter((tag) => tag.name && !tag.isDeleted);
    await CourseModel.findByIdAndUpdate(id, {
      $addToSet: {
        tags: {
          $each: newTags,
        },
      },
    });
  }

  // fetch the updated course
  const result = await CourseModel.findById(id).populate("categoryId");

  return result;
};



export const CourseServices = {
  createCourse,
  getAllCourses,
  updateCourse,
};

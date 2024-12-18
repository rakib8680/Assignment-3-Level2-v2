



import { TCourse } from "./course.interface";
import { CourseModel } from "./course.model";





// create a course 
const createCourse = async(payload:TCourse)=>{
    const result = await CourseModel.create(payload);
    return result; 

};



// get all courses
const getAllCourses = async ()=>{
    const result = await CourseModel.find();
    return result;
}




export const CourseServices = {
    createCourse,
    getAllCourses
}
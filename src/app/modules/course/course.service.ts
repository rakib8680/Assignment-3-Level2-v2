



import { TCourse } from "./course.interface";
import { CourseModel } from "./course.model";





// create a course 
const createCourse = async(payload:TCourse)=>{
    const result = await CourseModel.create(payload);
    return result; 

};






export const CourseServices = {
    createCourse
}
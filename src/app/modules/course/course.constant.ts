import { TLevel } from "./course.interface";


// "tags": [
//     {
//         "name": "Designing",
//         "isDeleted": false,
//         "_id": "6764085a1ecde5466a25b361"
//     },
//     {
//         "name": "Graphic Design",
//         "isDeleted": false,
//         "_id": "6764085a1ecde5466a25b362"
//     }
// ],


export const courseLevel : TLevel[] = ["Beginner", "Intermediate", "Advanced"];
export const courseSearchableFields = ["title", "instructor", "tags.name"];
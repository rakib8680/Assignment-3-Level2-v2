import { Schema, model } from "mongoose";
import { TCourse, TTags } from "./course.interface";
import { courseLevel } from "./course.constant";

const tagsSchema = new Schema<TTags>({
  name: {
    type: String,
    required: [true, "Tag name is required"],
  },
  isDeleted: { type: Boolean, default: false },
});

const courseSchema = new Schema<TCourse>({
  title: {
    type: String,
    unique: true,
    required: [true, "Course title is required"],
  },
  instructor: {
    type: String,
    required: [true, "Instructor name is required"],
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "category",
    required: [true, "Please provide a category id"],
  },
  price: {
    type: Number,
    required: [true, "Provide a price for the course"],
  },
  tags: tagsSchema,
  startDate: {
    type: String,
    required: [true, "Start date is required"],
  },
  endDate: {
    type: String,
    required: [true, "End date is required"],
  },
  language: {
    type: String,
    required: [true, "Course language is required"],
  },
  provider: {
    type: String,
    required: [true, "Course provider is required"],
  },
  durationInWeeks: {
    type: Number,
    required: [true, "Course duration is required"],
  },
  details: {
    level: {
      type: String,
      enum: {
        values: courseLevel,
      },
      required: [true, "Course level is required"],
    },
    description: String,
  },
});

export const CourseModel = model<TCourse>("course", courseSchema);

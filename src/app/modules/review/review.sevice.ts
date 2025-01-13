import { TReview } from "./review.interface";
import { ReviewModel } from "./review.model";

// create review
const createReview = async (payload: TReview) => {
  const result = await ReviewModel.create(payload);
  return result;
};

// get all reviews
const getAllReviews = async () => {
  const result = await ReviewModel.find().populate("courseId");
  return result;
}

export const reviewServices = {
  createReview,
  getAllReviews,
};

import catchAsync from "../../utils/catchAsync";
import { reviewServices } from "./review.sevice";

// create review
const createReview = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await reviewServices.createReview(payload);
  res.status(201).json({
    success: true,
    status: 201,
    message: "Review created successfully",
    data: result,
  });
});


// get all reviews
const getAllReviews = catchAsync(async (req, res) => {
  const result = await reviewServices.getAllReviews();
  res.status(200).json({
    success: true,
    status: 200,
    message: "Reviews fetched successfully",
    data: result,
  });
});

export const reviewController = {
  createReview,
  getAllReviews,
};



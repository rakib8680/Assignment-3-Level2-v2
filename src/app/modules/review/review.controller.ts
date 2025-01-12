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

export const reviewController = {
  createReview,
};

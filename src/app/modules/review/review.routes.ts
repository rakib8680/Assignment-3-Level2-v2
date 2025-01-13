import { Router } from "express";
import { reviewController } from "./review.controller";

const router = Router();


router.post('/create-review', reviewController.createReview)
router.get('/all-reviews', reviewController.getAllReviews)




export const ReviewRoutes = router;
import express from "express";
import { ENUM_USER_ROLE } from "../user/user.constants";
import auth from "../../middlewares/auth";
import { reviewController } from "./review.controller";

const router = express.Router();

router
  .route("/create")
  .post(
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),
    reviewController.createNewReview
  );

router
  .route("/get-all")
  .get(
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    reviewController.getAllReviews
  );

router.route("/attraction/:id").get(reviewController.getAttractionReviews);

router
  .route("/user/:id")
  .get(
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),
    reviewController.getUserReviews
  );

router
  .route("/update/:id")
  .patch(
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    reviewController.updateReview
  );

router
  .route("/delete/:id")
  .delete(
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    reviewController.deleteById
  );

export const reviewRoutes = router;

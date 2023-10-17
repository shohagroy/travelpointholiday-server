import express from "express";
import { ENUM_USER_ROLE } from "../user/user.constants";
import auth from "../../middlewares/auth";
import { bookingController } from "./booking.controller";
// import { attractionController } from "./attraction.controller";

const router = express.Router();

router
  .route("/create")
  .post(
    auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    bookingController.createBooking
  );

router
  .route("/cancel")
  .patch(
    auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    bookingController.bookingCancel
  );

router
  .route("/user-booking")
  .get(
    auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    bookingController.getUserBookingList
  );

router
  .route("/get-all")
  .get(
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    bookingController.getALlBooking
  );

export const bookingRoutes = router;

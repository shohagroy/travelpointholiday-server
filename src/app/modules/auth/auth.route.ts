import express from "express";
import { authController } from "./auth.controller";
import { ENUM_USER_ROLE } from "../user/user.constants";
import auth from "../../middlewares/auth";

const router = express.Router();

router.route("/create-user").post(authController.userSignup);
router.route("/login").post(authController.userSignin);
router
  .route("/change-password")
  .patch(
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
    authController.changePassword
  );

router
  .route("/change-user-role")
  .patch(
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    authController.changeUserRole
  );

router
  .route("/delete-user")
  .patch(
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    authController.deleteUser
  );

export const authRoutes = router;

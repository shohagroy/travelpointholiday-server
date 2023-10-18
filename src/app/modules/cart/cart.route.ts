import express from "express";
import { ENUM_USER_ROLE } from "../user/user.constants";
import auth from "../../middlewares/auth";
import { cartController } from "./cart.controller";

const router = express.Router();

router
  .route("/get-users-cart")
  .get(
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),
    cartController.getUserCart
  );

router
  .route("/add-to-cart")
  .post(
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),
    cartController.addToCart
  );

router
  .route("/remove-to-cart")
  .post(
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),
    cartController.removeToCart
  );

router
  .route("/decrement-cart-items-quantity")
  .post(
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),
    cartController.removeCartItemsQuantity
  );

export const cartRoutes = router;

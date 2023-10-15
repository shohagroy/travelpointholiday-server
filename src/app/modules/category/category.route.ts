import express from "express";
import { ENUM_USER_ROLE } from "../user/user.constants";
import auth from "../../middlewares/auth";
import { categoryController } from "./category.controller";

const router = express.Router();

router.route("/").get(categoryController.getAllCategory);
router
  .route("/create")
  .post(
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    categoryController.createCategory
  );
router
  .route("/:id")
  .patch(
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    categoryController.updateCategory
  )
  .get(categoryController.getById)
  .delete(
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    categoryController.deleteById
  );

export const categoryRoutes = router;

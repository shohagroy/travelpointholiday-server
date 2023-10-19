import express from "express";
import { ENUM_USER_ROLE } from "../user/user.constants";
import auth from "../../middlewares/auth";
import { banarController } from "./banar.controller";

const router = express.Router();

router.route("/").get(banarController.getAllBanar);
router
  .route("/upload")
  .post(
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    banarController.createbanar
  );

router
  .route("/:id")
  .patch(
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    banarController.updateBanar
  )
  .delete(
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    banarController.deleteById
  );

export const banarRoutes = router;

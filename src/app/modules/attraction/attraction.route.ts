import express from "express";
import { ENUM_USER_ROLE } from "../user/user.constants";
import auth from "../../middlewares/auth";
import { attractionController } from "./attraction.controller";
// import { attractionController } from "./attraction.controller";

const router = express.Router();

router.route("/").get(attractionController.getAllAttraction);

router
  .route("/create")
  .post(
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    attractionController.createNewAttraction
  );

export const arrtactionRoutes = router;

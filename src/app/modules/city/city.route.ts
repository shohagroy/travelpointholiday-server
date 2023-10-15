import express from "express";
import { ENUM_USER_ROLE } from "../user/user.constants";
import auth from "../../middlewares/auth";
import { cityController } from "./city.controller";

const router = express.Router();

router.route("/").get(cityController.getALlCity);
router.route("/get-all").get(cityController.getAllData);
router
  .route("/create")
  .post(
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    cityController.createCity
  );
router
  .route("/:id")
  .patch(
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    cityController.updateCity
  )
  .get(cityController.getById)
  .delete(
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    cityController.deleteById
  );

export const cityRoutes = router;

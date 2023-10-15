import express from "express";
import { ENUM_USER_ROLE } from "../user/user.constants";
import auth from "../../middlewares/auth";
import { countryController } from "./country.controller";

const router = express.Router();

router.route("/").get(countryController.getAllCountry);
router
  .route("/create")
  .post(
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    countryController.createCountry
  );
router
  .route("/get-all")
  .get(
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    countryController.getAllData
  );
router
  .route("/:id")
  .patch(
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    countryController.updateCountry
  )
  .get(countryController.getById)
  .delete(
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    countryController.deleteById
  );

export const countryRoutes = router;

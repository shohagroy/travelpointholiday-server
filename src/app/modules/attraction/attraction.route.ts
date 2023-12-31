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

router
  .route("/:id")
  .delete(
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    attractionController.deleteById
  )
  .get(attractionController.getById)
  .patch(
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    attractionController.updateById
  );

router
  .route("/edit-info/:id")
  .patch(
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    attractionController.updateById
  );

router
  .route("/images/:id")
  .patch(
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    attractionController.removeImage
  )
  .post(
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    attractionController.uploadNewImage
  );

export const arrtactionRoutes = router;

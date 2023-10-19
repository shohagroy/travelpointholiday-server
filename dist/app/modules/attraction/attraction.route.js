"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrtactionRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_constants_1 = require("../user/user.constants");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const attraction_controller_1 = require("./attraction.controller");
// import { attractionController } from "./attraction.controller";
const router = express_1.default.Router();
router.route("/").get(attraction_controller_1.attractionController.getAllAttraction);
router
    .route("/create")
    .post((0, auth_1.default)(user_constants_1.ENUM_USER_ROLE.ADMIN, user_constants_1.ENUM_USER_ROLE.SUPER_ADMIN), attraction_controller_1.attractionController.createNewAttraction);
router
    .route("/:id")
    .delete((0, auth_1.default)(user_constants_1.ENUM_USER_ROLE.ADMIN, user_constants_1.ENUM_USER_ROLE.SUPER_ADMIN), attraction_controller_1.attractionController.deleteById)
    .get(attraction_controller_1.attractionController.getById)
    .patch((0, auth_1.default)(user_constants_1.ENUM_USER_ROLE.ADMIN, user_constants_1.ENUM_USER_ROLE.SUPER_ADMIN), attraction_controller_1.attractionController.updateById);
router
    .route("/edit-info/:id")
    .patch((0, auth_1.default)(user_constants_1.ENUM_USER_ROLE.ADMIN, user_constants_1.ENUM_USER_ROLE.SUPER_ADMIN), attraction_controller_1.attractionController.updateById);
router
    .route("/images/:id")
    .patch((0, auth_1.default)(user_constants_1.ENUM_USER_ROLE.ADMIN, user_constants_1.ENUM_USER_ROLE.SUPER_ADMIN), attraction_controller_1.attractionController.removeImage)
    .post((0, auth_1.default)(user_constants_1.ENUM_USER_ROLE.ADMIN, user_constants_1.ENUM_USER_ROLE.SUPER_ADMIN), attraction_controller_1.attractionController.uploadNewImage);
exports.arrtactionRoutes = router;

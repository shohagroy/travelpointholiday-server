"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.banarRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_constants_1 = require("../user/user.constants");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const banar_controller_1 = require("./banar.controller");
const router = express_1.default.Router();
router.route("/").get(banar_controller_1.banarController.getAllBanar);
router
    .route("/create")
    .post((0, auth_1.default)(user_constants_1.ENUM_USER_ROLE.ADMIN, user_constants_1.ENUM_USER_ROLE.SUPER_ADMIN), banar_controller_1.banarController.createbanar);
router
    .route("/:id")
    .patch((0, auth_1.default)(user_constants_1.ENUM_USER_ROLE.SUPER_ADMIN, user_constants_1.ENUM_USER_ROLE.ADMIN), banar_controller_1.banarController.updateBanar)
    .delete((0, auth_1.default)(user_constants_1.ENUM_USER_ROLE.ADMIN, user_constants_1.ENUM_USER_ROLE.SUPER_ADMIN), banar_controller_1.banarController.deleteById);
exports.banarRoutes = router;

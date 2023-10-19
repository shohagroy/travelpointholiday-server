"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const user_constants_1 = require("../user/user.constants");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const passport_1 = __importDefault(require("passport"));
const router = express_1.default.Router();
router
    .route("/google")
    .get(passport_1.default.authenticate("google", { scope: ["profile"] }));
router.route("/callback").get(auth_controller_1.authController.googleCallBack);
router.route("/get-google-callback").get(auth_controller_1.authController.googleLoginUrl);
router.route("/create-user").post(auth_controller_1.authController.userSignup);
router.route("/login").post(auth_controller_1.authController.userSignin);
router
    .route("/change-password")
    .patch((0, auth_1.default)(user_constants_1.ENUM_USER_ROLE.SUPER_ADMIN, user_constants_1.ENUM_USER_ROLE.ADMIN, user_constants_1.ENUM_USER_ROLE.USER), auth_controller_1.authController.changePassword);
router
    .route("/change-user-role")
    .patch((0, auth_1.default)(user_constants_1.ENUM_USER_ROLE.SUPER_ADMIN, user_constants_1.ENUM_USER_ROLE.ADMIN), auth_controller_1.authController.changeUserRole);
router
    .route("/delete-user")
    .patch((0, auth_1.default)(user_constants_1.ENUM_USER_ROLE.SUPER_ADMIN, user_constants_1.ENUM_USER_ROLE.ADMIN), auth_controller_1.authController.deleteUser);
router.route("/refresh-token").post(
// auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
auth_controller_1.authController.getAccessToken);
exports.authRoutes = router;

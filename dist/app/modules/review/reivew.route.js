"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_constants_1 = require("../user/user.constants");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const review_controller_1 = require("./review.controller");
const router = express_1.default.Router();
router
    .route("/create")
    .post((0, auth_1.default)(user_constants_1.ENUM_USER_ROLE.ADMIN, user_constants_1.ENUM_USER_ROLE.SUPER_ADMIN, user_constants_1.ENUM_USER_ROLE.USER), review_controller_1.reviewController.createNewReview);
router
    .route("/get-all")
    .get((0, auth_1.default)(user_constants_1.ENUM_USER_ROLE.ADMIN, user_constants_1.ENUM_USER_ROLE.SUPER_ADMIN), review_controller_1.reviewController.getAllReviews);
router.route("/attraction/:id").get(review_controller_1.reviewController.getAttractionReviews);
router
    .route("/user/:id")
    .get((0, auth_1.default)(user_constants_1.ENUM_USER_ROLE.ADMIN, user_constants_1.ENUM_USER_ROLE.SUPER_ADMIN, user_constants_1.ENUM_USER_ROLE.USER), review_controller_1.reviewController.getUserReviews);
router
    .route("/update/:id")
    .patch((0, auth_1.default)(user_constants_1.ENUM_USER_ROLE.SUPER_ADMIN, user_constants_1.ENUM_USER_ROLE.ADMIN), review_controller_1.reviewController.updateReview);
router
    .route("/delete/:id")
    .delete((0, auth_1.default)(user_constants_1.ENUM_USER_ROLE.ADMIN, user_constants_1.ENUM_USER_ROLE.SUPER_ADMIN), review_controller_1.reviewController.deleteById);
exports.reviewRoutes = router;

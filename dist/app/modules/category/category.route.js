"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_constants_1 = require("../user/user.constants");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const category_controller_1 = require("./category.controller");
const router = express_1.default.Router();
router.route("/").get(category_controller_1.categoryController.getAllCategory);
router.route("/get-all").get(category_controller_1.categoryController.getAllCategoryData);
router
    .route("/create")
    .post((0, auth_1.default)(user_constants_1.ENUM_USER_ROLE.ADMIN, user_constants_1.ENUM_USER_ROLE.SUPER_ADMIN), category_controller_1.categoryController.createCategory);
router
    .route("/:id")
    .patch((0, auth_1.default)(user_constants_1.ENUM_USER_ROLE.SUPER_ADMIN, user_constants_1.ENUM_USER_ROLE.ADMIN), category_controller_1.categoryController.updateCategory)
    .get(category_controller_1.categoryController.getById)
    .delete((0, auth_1.default)(user_constants_1.ENUM_USER_ROLE.ADMIN, user_constants_1.ENUM_USER_ROLE.SUPER_ADMIN), category_controller_1.categoryController.deleteById);
exports.categoryRoutes = router;

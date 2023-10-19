"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_constants_1 = require("../user/user.constants");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const booking_controller_1 = require("./booking.controller");
// import { attractionController } from "./attraction.controller";
const router = express_1.default.Router();
router
    .route("/create")
    .post((0, auth_1.default)(user_constants_1.ENUM_USER_ROLE.USER, user_constants_1.ENUM_USER_ROLE.ADMIN, user_constants_1.ENUM_USER_ROLE.SUPER_ADMIN), booking_controller_1.bookingController.createBooking);
router
    .route("/cancel")
    .patch((0, auth_1.default)(user_constants_1.ENUM_USER_ROLE.USER, user_constants_1.ENUM_USER_ROLE.ADMIN, user_constants_1.ENUM_USER_ROLE.SUPER_ADMIN), booking_controller_1.bookingController.bookingCancel);
router
    .route("/user-booking")
    .get((0, auth_1.default)(user_constants_1.ENUM_USER_ROLE.USER, user_constants_1.ENUM_USER_ROLE.ADMIN, user_constants_1.ENUM_USER_ROLE.SUPER_ADMIN), booking_controller_1.bookingController.getUserBookingList);
router
    .route("/get-all")
    .get((0, auth_1.default)(user_constants_1.ENUM_USER_ROLE.ADMIN, user_constants_1.ENUM_USER_ROLE.SUPER_ADMIN), booking_controller_1.bookingController.getALlBooking);
router
    .route("/refund-cancel")
    .patch((0, auth_1.default)(user_constants_1.ENUM_USER_ROLE.ADMIN, user_constants_1.ENUM_USER_ROLE.SUPER_ADMIN), booking_controller_1.bookingController.refundCancel);
router
    .route("/refund-confirm")
    .patch((0, auth_1.default)(user_constants_1.ENUM_USER_ROLE.ADMIN, user_constants_1.ENUM_USER_ROLE.SUPER_ADMIN), booking_controller_1.bookingController.refundConfirm);
router
    .route("/cancel-and-refund")
    .patch((0, auth_1.default)(user_constants_1.ENUM_USER_ROLE.ADMIN, user_constants_1.ENUM_USER_ROLE.SUPER_ADMIN), booking_controller_1.bookingController.cancelBookingAndRefund);
exports.bookingRoutes = router;

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const booking_service_1 = require("./booking.service");
const attraction_service_1 = require("../attraction/attraction.service");
const pick_1 = __importDefault(require("../../../shared/pick"));
const pagination_1 = require("../../../constants/pagination");
const booking_constans_1 = require("./booking.constans");
const createBooking = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { attractionId, totalTicket, userId } = req.body;
    const attractionInfo = yield attraction_service_1.attractionService.getById(attractionId);
    const payment = (attractionInfo === null || attractionInfo === void 0 ? void 0 : attractionInfo.price) * Number(totalTicket);
    const bookingInfo = {
        userId,
        attractionId: attractionInfo.id,
        payment,
        totalTicket: Number(totalTicket),
    };
    const result = yield booking_service_1.bookingService.createBooking(bookingInfo);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Attraction Booking Successufully!",
        data: result,
    });
}));
const getUserBookingList = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const result = yield booking_service_1.bookingService.getUserBookingList(paginationOptions, req.user.userId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User Booking list get Successufully!",
        data: result,
    });
}));
const getALlBooking = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const filters = (0, pick_1.default)(req.query, booking_constans_1.bookingFilterableFields);
    const result = yield booking_service_1.bookingService.getAllBooking(paginationOptions, filters);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Booking lists get Successufully!",
        data: result,
    });
}));
const bookingCancel = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, totalTicket } = req.body;
    const result = yield booking_service_1.bookingService.bookingCancel(id, totalTicket);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Booking Cancel Successufully!",
        data: result,
    });
}));
const refundConfirm = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    const result = yield booking_service_1.bookingService.refundConfirm(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Refund Request Confirm Successufully!",
        data: result,
    });
}));
const refundCancel = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, totalTicket } = req.body;
    const result = yield booking_service_1.bookingService.bookingCancel(id, totalTicket);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Booking Cancel Successufully!",
        data: result,
    });
}));
const cancelBookingAndRefund = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, totalTicket } = req.body;
    const result = yield booking_service_1.bookingService.cancelBookingAndRefund(id, totalTicket);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Booking Cancel and Refund Successufully!",
        data: result,
    });
});
exports.bookingController = {
    createBooking,
    getUserBookingList,
    getALlBooking,
    bookingCancel,
    refundCancel,
    refundConfirm,
    cancelBookingAndRefund,
};

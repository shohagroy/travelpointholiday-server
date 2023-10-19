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
exports.cartController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const cart_service_1 = require("./cart.service");
const addToCart = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req === null || req === void 0 ? void 0 : req.user;
    req.body["userId"] = id;
    let result;
    const isAlreadyExits = yield cart_service_1.cartService.findUnique(req.body);
    if (!isAlreadyExits) {
        result = yield cart_service_1.cartService.addToCart(req.body);
    }
    else {
        result = yield cart_service_1.cartService.addCartItemsQuantity(isAlreadyExits);
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Attraction Add to Cart Successufully!",
        data: result,
    });
}));
const removeCartItemsQuantity = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req === null || req === void 0 ? void 0 : req.user;
    req.body["userId"] = id;
    req.body["totalTicket"] = 1;
    let result;
    const isAlreadyExits = yield cart_service_1.cartService.findUnique(req.body);
    if ((isAlreadyExits === null || isAlreadyExits === void 0 ? void 0 : isAlreadyExits.totalTicket) === 1) {
        result = yield cart_service_1.cartService.removeToCart(isAlreadyExits === null || isAlreadyExits === void 0 ? void 0 : isAlreadyExits.id);
    }
    else {
        result = yield cart_service_1.cartService.removeCartItemsQuantity(req.body);
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Attraction Remove to Cart Successufully!",
        data: result,
    });
}));
const removeToCart = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cart_service_1.cartService.removeToCart(req.body.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Attraction Remove from Cart Successufully!",
        data: result,
    });
}));
const getUserCart = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    const result = yield cart_service_1.cartService.getUserCart(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User Cartlist received Successufully!",
        data: result,
    });
}));
exports.cartController = {
    addToCart,
    removeToCart,
    getUserCart,
    removeCartItemsQuantity,
};

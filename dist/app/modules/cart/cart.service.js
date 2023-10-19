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
exports.cartService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const addToCart = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.userCart.create({
        data: payload,
    });
    return result;
});
const removeToCart = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.userCart.delete({
        where: {
            id,
        },
    });
    return result;
});
const addCartItemsQuantity = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.userCart.update({
        where: {
            id: payload.id,
        },
        data: {
            totalTicket: {
                increment: 1,
            },
        },
    });
    return result;
});
const removeCartItemsQuantity = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.userCart.update({
        where: {
            id: payload.id,
        },
        data: {
            totalTicket: {
                decrement: payload.totalTicket,
            },
        },
    });
    return result;
});
const getUserCart = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.userCart.findMany({
        where: {
            userId: id,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    return result;
});
const findUnique = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.userCart.findFirst({
        where: {
            userId: payload.userId,
            attractionId: payload.attractionId,
        },
    });
    return result;
});
exports.cartService = {
    addToCart,
    removeToCart,
    getUserCart,
    findUnique,
    addCartItemsQuantity,
    removeCartItemsQuantity,
};

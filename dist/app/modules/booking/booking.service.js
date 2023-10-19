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
exports.bookingService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const createBooking = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const bookingInfo = yield transactionClient.attractionBooking.create({
            data: payload,
        });
        yield transactionClient.attractions.update({
            where: {
                id: payload.attractionId,
            },
            data: {
                totalSeat: {
                    decrement: payload === null || payload === void 0 ? void 0 : payload.totalTicket,
                },
                bookingSeat: {
                    increment: payload === null || payload === void 0 ? void 0 : payload.totalTicket,
                },
            },
        });
        return bookingInfo;
    }));
    return result;
});
const getAllBooking = (paginationOptions, filters) => __awaiter(void 0, void 0, void 0, function* () {
    const { size, page, skip } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const { cancel, refund, booked } = filters;
    const andConditions = [];
    if (cancel && !refund && !booked) {
        andConditions.push({
            OR: [
                {
                    status: {
                        equals: "cancel",
                    },
                    refundStatus: {
                        equals: false,
                    },
                },
            ],
        });
    }
    if (refund && !cancel && !booked) {
        andConditions.push({
            OR: [
                {
                    status: {
                        equals: "cancel",
                    },
                    refundStatus: {
                        equals: true,
                    },
                },
            ],
        });
    }
    if (!refund && !cancel && booked) {
        andConditions.push({
            OR: [
                {
                    status: {
                        equals: "booked",
                    },
                    refundStatus: {
                        equals: false,
                    },
                },
            ],
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.attractionBooking.findMany({
        where: whereConditions,
        skip,
        take: size,
        orderBy: paginationOptions.sortBy && paginationOptions.sortOrder
            ? {
                [paginationOptions === null || paginationOptions === void 0 ? void 0 : paginationOptions.sortBy]: paginationOptions === null || paginationOptions === void 0 ? void 0 : paginationOptions.sortOrder,
            }
            : {
                createdAt: "desc",
            },
        include: {
            userInfo: true,
            attraction: {
                include: {
                    images: true,
                },
            },
        },
    });
    const total = yield prisma_1.default.attractionBooking.count({
        where: whereConditions,
    });
    return {
        meta: {
            total,
            page,
            size,
        },
        data: result,
    };
});
const getUserBookingList = (paginationOptions, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const { size, page, skip } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const result = yield prisma_1.default.attractionBooking.findMany({
        where: {
            userId,
        },
        skip,
        take: size,
        orderBy: paginationOptions.sortBy && paginationOptions.sortOrder
            ? {
                [paginationOptions === null || paginationOptions === void 0 ? void 0 : paginationOptions.sortBy]: paginationOptions === null || paginationOptions === void 0 ? void 0 : paginationOptions.sortOrder,
            }
            : {
                createdAt: "desc",
            },
        include: {
            userInfo: true,
            attraction: {
                include: {
                    images: true,
                },
            },
        },
    });
    return result;
});
const bookingCancel = (id, totalTicket) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const bookingInfo = yield transactionClient.attractionBooking.update({
            where: {
                id,
            },
            data: {
                status: "cancel",
                refundStatus: false,
            },
        });
        yield transactionClient.attractions.update({
            where: {
                id: bookingInfo.attractionId,
            },
            data: {
                totalSeat: {
                    increment: totalTicket,
                },
                bookingSeat: {
                    decrement: totalTicket,
                },
            },
        });
        return bookingInfo;
    }));
    return result;
});
const refundCancel = (id, totalTicket) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const bookingInfo = yield transactionClient.attractionBooking.update({
            where: {
                id,
            },
            data: {
                status: "booked",
                refundStatus: false,
            },
        });
        yield transactionClient.attractions.update({
            where: {
                id: bookingInfo.attractionId,
            },
            data: {
                totalSeat: {
                    decrement: totalTicket,
                },
                bookingSeat: {
                    increment: totalTicket,
                },
            },
        });
        return bookingInfo;
    }));
    return result;
});
const refundConfirm = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const bookingInfo = yield transactionClient.attractionBooking.update({
            where: {
                id,
            },
            data: {
                status: "cancel",
                refundStatus: true,
            },
        });
        return bookingInfo;
    }));
    return result;
});
const cancelBookingAndRefund = (id, totalTicket) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const bookingInfo = yield transactionClient.attractionBooking.update({
            where: {
                id,
            },
            data: {
                status: "cancel",
                refundStatus: true,
            },
        });
        yield transactionClient.attractions.update({
            where: {
                id: bookingInfo.attractionId,
            },
            data: {
                totalSeat: {
                    increment: totalTicket,
                },
                bookingSeat: {
                    decrement: totalTicket,
                },
            },
        });
        return bookingInfo;
    }));
    return result;
});
exports.bookingService = {
    createBooking,
    getUserBookingList,
    getAllBooking,
    bookingCancel,
    refundCancel,
    refundConfirm,
    cancelBookingAndRefund,
};

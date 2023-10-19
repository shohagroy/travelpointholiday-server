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
exports.reviewService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const createNewReview = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.review.create({
        data: payload,
    });
    return result;
});
const updateReview = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.review.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
const getAllReviews = (paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { size, page, skip } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const result = yield prisma_1.default.review.findMany({
        skip,
        take: size,
        orderBy: paginationOptions.sortBy && paginationOptions.sortOrder
            ? { [paginationOptions.sortBy]: paginationOptions.sortOrder }
            : {
                createdAt: "desc",
            },
    });
    const total = yield prisma_1.default.country.count({});
    return {
        meta: {
            total,
            page,
            size,
        },
        data: result,
    };
});
const getAttractionReviews = (id, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { size, page, skip } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const result = yield prisma_1.default.review.findMany({
        where: {
            attractionId: id,
        },
        include: {
            user: {
                include: {
                    profileImg: true,
                },
            },
        },
        skip,
        take: size,
        orderBy: paginationOptions.sortBy && paginationOptions.sortOrder
            ? { [paginationOptions.sortBy]: paginationOptions.sortOrder }
            : {
                createdAt: "desc",
            },
    });
    const total = yield prisma_1.default.review.count({
        where: {
            attractionId: id,
        },
    });
    const reviewData = result.map((review) => {
        var _a;
        return Object.assign(Object.assign({}, review), { user: {
                name: review.user.name,
                address: review.user.address,
                profileImg: ((_a = review.user.profileImg) === null || _a === void 0 ? void 0 : _a.secure_url) || "",
            } });
    });
    return {
        meta: {
            total,
            page,
            size,
        },
        data: reviewData,
    };
});
const getUserReviews = (paginationOptions, id) => __awaiter(void 0, void 0, void 0, function* () {
    const { size, page, skip } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const result = yield prisma_1.default.review.findMany({
        where: {
            userId: id,
        },
        include: {
            user: {
                include: {
                    profileImg: true,
                },
            },
        },
        skip,
        take: size,
        orderBy: paginationOptions.sortBy && paginationOptions.sortOrder
            ? { [paginationOptions.sortBy]: paginationOptions.sortOrder }
            : {
                createdAt: "desc",
            },
    });
    const total = yield prisma_1.default.review.count({
        where: {
            userId: id,
        },
    });
    const reviewData = result.map((review) => {
        var _a;
        return Object.assign(Object.assign({}, review), { user: {
                name: review.user.name,
                address: review.user.address,
                profileImg: ((_a = review.user.profileImg) === null || _a === void 0 ? void 0 : _a.secure_url) || "",
            } });
    });
    return {
        meta: {
            total,
            page,
            size,
        },
        data: reviewData,
    };
});
const deleteById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.review.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.reviewService = {
    createNewReview,
    updateReview,
    getAllReviews,
    getAttractionReviews,
    getUserReviews,
    deleteById,
};

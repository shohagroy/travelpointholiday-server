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
exports.banarService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const createNewBanar = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.banar.create({
        data: payload,
    });
    return result;
});
const updateBanar = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.banar.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
const getAllBanar = (paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { size, page, skip } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const result = yield prisma_1.default.banar.findMany({
        skip,
        take: size,
    });
    const total = yield prisma_1.default.banar.count({});
    return {
        meta: {
            total,
            page,
            size,
        },
        data: result,
    };
});
const deleteById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.banar.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.banarService = {
    createNewBanar,
    updateBanar,
    getAllBanar,
    deleteById,
};

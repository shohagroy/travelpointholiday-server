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
const imagesUpload_1 = __importDefault(require("../../../helpers/imagesUpload"));
const deletedImages_1 = __importDefault(require("../../../helpers/deletedImages"));
const createNewBanar = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const uploadedImages = yield (0, imagesUpload_1.default)(payload);
    const result = yield prisma_1.default.banar.createMany({
        data: uploadedImages,
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
const getAllBanar = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.banar.findMany({});
    return result;
});
const deleteById = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.banar.delete({
        where: {
            id,
        },
    });
    yield (0, deletedImages_1.default)([data]);
    return result;
});
exports.banarService = {
    createNewBanar,
    updateBanar,
    getAllBanar,
    deleteById,
};

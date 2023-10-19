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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.attractionService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const attraction_constans_1 = require("./attraction.constans");
const imagesUpload_1 = __importDefault(require("../../../helpers/imagesUpload"));
const deletedImages_1 = __importDefault(require("../../../helpers/deletedImages"));
const createNewAttraction = (images, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const uploadedImages = yield (0, imagesUpload_1.default)(images);
    const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const attractionInfo = yield transactionClient.attractions.create({
            data: payload,
        });
        const attractionimagesInfo = uploadedImages.map((image) => ({
            secure_url: image.secure_url,
            public_id: image.public_id,
            attractionId: attractionInfo.id,
        }));
        yield transactionClient.images.createMany({
            data: attractionimagesInfo,
        });
        return attractionInfo;
    }));
    return result;
});
const getALlAttraction = (paginationOptions, filters) => __awaiter(void 0, void 0, void 0, function* () {
    const { size, page, skip } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const { search } = filters, filterData = __rest(filters, ["search"]);
    const andConditions = [];
    if (search) {
        andConditions.push({
            OR: attraction_constans_1.attractionSearchableFields.map((field) => ({
                [field]: {
                    contains: search,
                    mode: "insensitive",
                },
            })),
        });
    }
    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map((key) => {
                if (key === "categoryId") {
                    return {
                        categoryId: {
                            equals: filterData[key],
                        },
                    };
                }
                else if (key === "countryId") {
                    return {
                        countryId: {
                            equals: filterData[key],
                        },
                    };
                }
                else if (key === "cityId") {
                    return {
                        cityId: {
                            equals: filterData[key],
                        },
                    };
                }
            }),
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.attractions.findMany({
        where: whereConditions,
        include: {
            country: true,
            images: true,
            city: true,
            category: true,
        },
        skip,
        take: size,
        orderBy: paginationOptions.sortBy && paginationOptions.sortOrder
            ? { [paginationOptions.sortBy]: paginationOptions.sortOrder }
            : {
                createdAt: "desc",
            },
    });
    const total = yield prisma_1.default.attractions.count({
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
const deleteAttraction = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const imagesToDelete = yield prisma_1.default.images.findMany({
            where: {
                attractionId: id,
            },
            select: {
                public_id: true,
                secure_url: true,
            },
        });
        yield transactionClient.images.deleteMany({
            where: {
                attractionId: id,
            },
        });
        const deleteInfo = yield transactionClient.attractions.delete({
            where: {
                id: id,
            },
        });
        yield (0, deletedImages_1.default)(imagesToDelete);
        return deleteInfo;
    }));
    return result;
});
const getById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.attractions.findUnique({
        where: {
            id,
        },
        include: {
            images: true,
            category: true,
            country: true,
            city: true,
        },
    });
    return result;
});
const updateById = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.attractions.update({
        where: {
            id,
        },
        data,
    });
    return result;
});
const removeImage = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.images.delete({
        where: {
            id: data === null || data === void 0 ? void 0 : data.id,
        },
    });
    yield (0, deletedImages_1.default)([data]);
    return result;
});
const uploadNewImage = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const uploadedImages = yield (0, imagesUpload_1.default)(data);
    const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const attractionimagesInfo = uploadedImages.map((image) => ({
            secure_url: image.secure_url,
            public_id: image.public_id,
            attractionId: id,
        }));
        const imagesInfo = yield transactionClient.images.createMany({
            data: attractionimagesInfo,
        });
        return imagesInfo;
    }));
    return result;
});
exports.attractionService = {
    createNewAttraction,
    getALlAttraction,
    deleteAttraction,
    updateById,
    getById,
    removeImage,
    uploadNewImage,
};

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
exports.userService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const imagesUpload_1 = __importDefault(require("../../../helpers/imagesUpload"));
const deletedImages_1 = __importDefault(require("../../../helpers/deletedImages"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const user_constants_1 = require("./user.constants");
const getAllUserToDb = (paginationOptions, filters) => __awaiter(void 0, void 0, void 0, function* () {
    const { size, page, skip } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const { search } = filters, filterData = __rest(filters, ["search"]);
    const andConditions = [];
    if (search) {
        andConditions.push({
            OR: user_constants_1.userSearchableFields.map((field) => ({
                [field]: {
                    contains: search,
                    mode: "insensitive",
                },
            })),
        });
    }
    if (filterData) {
        andConditions.push({
            AND: Object.keys(filterData).map((key) => {
                if (key === "role") {
                    return {
                        role: {
                            equals: filterData[key],
                        },
                    };
                }
            }),
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.user.findMany({
        where: whereConditions,
        include: {
            profileImg: true,
        },
        take: size,
        skip,
    });
    const total = yield prisma_1.default.user.count({
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
const getSingleUserToDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.findFirst({
        where: {
            id,
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            contact: true,
            address: true,
            gender: true,
            profileImg: {
                select: {
                    id: true,
                    public_id: true,
                    secure_url: true,
                },
            },
            createdAt: true,
            updatedAt: true,
        },
    });
    return result;
});
const updateUserDataToDb = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.update({
        where: {
            id,
        },
        data: payload,
        include: {
            profileImg: true,
        },
    });
    return result;
});
const updateUserAvatar = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const avatarImage = yield (0, imagesUpload_1.default)(payload);
    const isAlreadyExist = yield prisma_1.default.avatar.findUnique({
        where: {
            userId: id,
        },
    });
    if (isAlreadyExist) {
        yield (0, deletedImages_1.default)([isAlreadyExist]);
        const result = yield prisma_1.default.avatar.update({
            where: {
                userId: id,
            },
            data: {
                secure_url: avatarImage[0].secure_url,
                public_id: avatarImage[0].public_id,
            },
        });
        return result;
    }
    const result = yield prisma_1.default.avatar.create({
        data: {
            secure_url: avatarImage[0].secure_url,
            public_id: avatarImage[0].public_id,
            userId: id,
        },
    });
    return result;
});
const deleteUserToDb = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        if ((data === null || data === void 0 ? void 0 : data.avatarId) !== "undifine") {
            yield transactionClient.avatar.delete({
                where: {
                    id: data.avatarId,
                },
            });
        }
        const userInfo = yield transactionClient.user.delete({
            where: {
                id: data.id,
            },
        });
        return userInfo;
    }));
    return result;
});
const findByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findUnique({
        where: {
            email,
        },
        include: {
            profileImg: {
                select: {
                    id: true,
                    public_id: true,
                    secure_url: true,
                },
            },
        },
    });
    return user;
});
const insertUserToDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const userInfo = yield transactionClient.user.create({
            data: {
                email: data.email,
                name: data.name,
                password: data.password,
                role: data.role,
            },
        });
        if (data === null || data === void 0 ? void 0 : data.avatarId) {
            yield transactionClient.avatar.create({
                data: {
                    secure_url: data.avatarId,
                    public_id: "google_img",
                    userId: userInfo.id,
                },
            });
        }
        return userInfo;
    }));
    return result;
});
exports.userService = {
    findByEmail,
    insertUserToDB,
    getAllUserToDb,
    getSingleUserToDb,
    updateUserDataToDb,
    deleteUserToDb,
    updateUserAvatar,
};

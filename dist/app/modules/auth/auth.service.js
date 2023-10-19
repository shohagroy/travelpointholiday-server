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
exports.authService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
// import { hashedPassword } from "../../utils/hashedPassword";
// import { jwtHelpers } from "../../utils/jwtHelpers";
const user_service_1 = require("../user/user.service");
const hashedPassword_1 = require("../../../utils/hashedPassword");
const jwtHelpers_1 = require("../../../utils/jwtHelpers");
const envconfig_1 = __importDefault(require("../../../config/envconfig"));
const user_constants_1 = require("../user/user.constants");
const createNewUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExists = yield user_service_1.userService.findByEmail(payload.email);
    if (isUserExists) {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, "User Already Exists!");
    }
    payload.password = yield hashedPassword_1.hashedPassword.createhas(payload.password);
    payload.role = user_constants_1.ENUM_USER_ROLE.USER;
    const newUser = yield user_service_1.userService.insertUserToDB(payload);
    const refreshToken = yield jwtHelpers_1.jwtHelpers.createToken(newUser, envconfig_1.default.refreshToken_expires);
    const accessToken = yield jwtHelpers_1.jwtHelpers.createToken(newUser, envconfig_1.default.expires_in);
    return { refreshToken, accessToken };
});
const userSignin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const isUserExists = yield user_service_1.userService.findByEmail(email);
    if (!isUserExists) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User does not exists!");
    }
    const isPasswordMatched = yield hashedPassword_1.hashedPassword.comparePassword(password, isUserExists.password);
    if (!isPasswordMatched) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "Password does not match!");
    }
    const refreshToken = yield jwtHelpers_1.jwtHelpers.createToken(isUserExists, envconfig_1.default.refreshToken_expires);
    const accessToken = yield jwtHelpers_1.jwtHelpers.createToken(isUserExists, envconfig_1.default.expires_in);
    return { refreshToken, accessToken };
});
const changePassword = (email, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { newPassword, oldPassword } = payload;
    const isUserExists = yield user_service_1.userService.findByEmail(email);
    if (!isUserExists) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User does not exists!");
    }
    const isPasswordMatched = yield hashedPassword_1.hashedPassword.comparePassword(oldPassword, isUserExists.password);
    if (!isPasswordMatched) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "Password does not match!");
    }
    const password = yield hashedPassword_1.hashedPassword.createhas(newPassword);
    const result = yield user_service_1.userService.updateUserDataToDb(isUserExists.id, {
        password,
    });
    return result;
});
const getProfile = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userService.getSingleUserToDb(id);
    return result;
});
const createAccessToken = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userService.getSingleUserToDb(id);
    return result;
});
const changeUserRole = (id, role) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userService.updateUserDataToDb(id, role);
    return result;
});
const deleteUser = (email) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const isUserDelete = yield user_service_1.userService.findByEmail(email);
    const data = {
        id: isUserDelete.id,
        avatarId: ((_a = isUserDelete === null || isUserDelete === void 0 ? void 0 : isUserDelete.profileImg) === null || _a === void 0 ? void 0 : _a.id) || "undifine",
    };
    const result = yield user_service_1.userService.deleteUserToDb(data);
    return result;
});
exports.authService = {
    createNewUser,
    userSignin,
    getProfile,
    createAccessToken,
    changePassword,
    changeUserRole,
    deleteUser,
};

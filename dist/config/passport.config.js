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
const bcrypt_1 = require("bcrypt");
// import { Strategy as LocalStrategy } from "passport-local";
const passport_google_oauth20_1 = require("passport-google-oauth20");
// import User from "../modules/user/user.interface";
const google_config_1 = __importDefault(require("./google.config"));
const user_service_1 = require("../app/modules/user/user.service");
const client_1 = require("@prisma/client");
const passportConfig = (passport) => {
    passport.use(new passport_google_oauth20_1.Strategy(google_config_1.default, function (accessToken, refreshToken, profile, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            const { displayName, id, _json } = profile;
            const createDameEmail = `${id}@gmail.com`;
            try {
                const isUserExists = yield user_service_1.userService.findByEmail(createDameEmail);
                if (!isUserExists) {
                    const userInfo = {
                        email: createDameEmail,
                        name: displayName,
                        password: (0, bcrypt_1.hashSync)(id, 10),
                        role: client_1.Role.user,
                        avatarId: _json.picture,
                    };
                    const newUser = yield user_service_1.userService.insertUserToDB(userInfo);
                    return cb(null, newUser);
                }
                const userInfo = {
                    name: displayName,
                };
                const newUpdatedUser = yield user_service_1.userService.updateUserDataToDb(isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.id, userInfo);
                return cb(null, newUpdatedUser);
            }
            catch (error) {
                return cb(error, null);
            }
        });
    }));
    passport.serializeUser(function (user, done) {
        done(null, user.email);
    });
    passport.deserializeUser(function (email, done) {
        user_service_1.userService
            .findByEmail(email)
            .then((user) => {
            done(null, user);
        })
            .catch((error) => {
            done(error);
        });
    });
};
exports.default = passportConfig;

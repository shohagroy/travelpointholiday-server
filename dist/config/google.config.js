"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const envconfig_1 = __importDefault(require("./envconfig"));
const googleConfig = {
    clientID: envconfig_1.default.google_client_id,
    clientSecret: envconfig_1.default.google_client_secret,
    callbackURL: envconfig_1.default.google_call_back_url || "http://localhost:5000/auth/callback",
};
exports.default = googleConfig;

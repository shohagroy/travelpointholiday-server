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
const cloudinary_1 = require("../config/cloudinary");
const cloudinary_2 = require("cloudinary");
const ApiError_1 = __importDefault(require("../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
exports.default = (blobImages) => __awaiter(void 0, void 0, void 0, function* () {
    cloudinary_2.v2.config(cloudinary_1.config);
    const files = blobImages;
    try {
        const uploadedFiles = yield Promise.all(files.map((file) => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield cloudinary_2.v2.uploader.upload(file, {
                folder: "travel_point",
                resource_type: "image",
                access_mode: "public",
                allowed_formats: ["jpg", "png"],
                use_filename: true,
            });
            const image = {
                secure_url: result.secure_url,
                public_id: result.public_id,
            };
            return image;
        })));
        return uploadedFiles;
    }
    catch (error) {
        new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Error uploading images");
        return [];
    }
});

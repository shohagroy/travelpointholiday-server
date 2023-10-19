"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSearchableFields = exports.userFilterableFields = exports.ENUM_USER_ROLE = void 0;
var ENUM_USER_ROLE;
(function (ENUM_USER_ROLE) {
    ENUM_USER_ROLE["SUPER_ADMIN"] = "super_admin";
    ENUM_USER_ROLE["ADMIN"] = "admin";
    ENUM_USER_ROLE["USER"] = "user";
})(ENUM_USER_ROLE || (exports.ENUM_USER_ROLE = ENUM_USER_ROLE = {}));
exports.userFilterableFields = ["search", "role"];
exports.userSearchableFields = ["name", "email", "contact"];

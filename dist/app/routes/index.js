"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("../modules/auth/auth.route");
const user_route_1 = require("../modules/user/user.route");
const category_route_1 = require("../modules/category/category.route");
const country_route_1 = require("../modules/country/country.route");
const city_route_1 = require("../modules/city/city.route");
const attraction_route_1 = require("../modules/attraction/attraction.route");
const booking_route_1 = require("../modules/booking/booking.route");
const reivew_route_1 = require("../modules/review/reivew.route");
const cart_route_1 = require("../modules/cart/cart.route");
const banar_route_1 = require("../modules/banar/banar.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/auth",
        route: auth_route_1.authRoutes,
    },
    {
        path: "/users",
        route: user_route_1.userRoutes,
    },
    {
        path: "/categories",
        route: category_route_1.categoryRoutes,
    },
    {
        path: "/countries",
        route: country_route_1.countryRoutes,
    },
    {
        path: "/cities",
        route: city_route_1.cityRoutes,
    },
    {
        path: "/attractions",
        route: attraction_route_1.arrtactionRoutes,
    },
    {
        path: "/booking",
        route: booking_route_1.bookingRoutes,
    },
    {
        path: "/reviews",
        route: reivew_route_1.reviewRoutes,
    },
    {
        path: "/carts",
        route: cart_route_1.cartRoutes,
    },
    {
        path: "/banars",
        route: banar_route_1.banarRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;

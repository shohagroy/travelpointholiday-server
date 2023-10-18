import express from "express";
import { authRoutes } from "../modules/auth/auth.route";
import { userRoutes } from "../modules/user/user.route";
import { categoryRoutes } from "../modules/category/category.route";
import { countryRoutes } from "../modules/country/country.route";
import { cityRoutes } from "../modules/city/city.route";
import { arrtactionRoutes } from "../modules/attraction/attraction.route";
import { bookingRoutes } from "../modules/booking/booking.route";
import { reviewRoutes } from "../modules/review/reivew.route";
import { cartRoutes } from "../modules/cart/cart.route";
const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/users",
    route: userRoutes,
  },
  {
    path: "/categories",
    route: categoryRoutes,
  },
  {
    path: "/countries",
    route: countryRoutes,
  },
  {
    path: "/cities",
    route: cityRoutes,
  },
  {
    path: "/attractions",
    route: arrtactionRoutes,
  },
  {
    path: "/booking",
    route: bookingRoutes,
  },
  {
    path: "/reviews",
    route: reviewRoutes,
  },
  {
    path: "/carts",
    route: cartRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;

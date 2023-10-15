import express from "express";
import { authRoutes } from "../modules/auth/auth.route";
import { userRoutes } from "../modules/user/user.route";
import { categoryRoutes } from "../modules/category/category.route";
import { countryRoutes } from "../modules/country/country.route";
import { cityRoutes } from "../modules/city/city.route";
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
    route: cityRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;

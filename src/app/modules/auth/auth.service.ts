import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
// import { hashedPassword } from "../../utils/hashedPassword";
// import { jwtHelpers } from "../../utils/jwtHelpers";
import { userService } from "../user/user.service";
import { User } from "@prisma/client";
import { hashedPassword } from "../../../utils/hashedPassword";
import { jwtHelpers } from "../../../utils/jwtHelpers";
import envconfig from "../../../config/envconfig";
import { ENUM_USER_ROLE } from "../user/user.constants";
import { IChangePassword } from "./auth.constans";

const createNewUser = async (payload: User) => {
  const isUserExists = await userService.findByEmail(payload.email);

  if (isUserExists) {
    throw new ApiError(httpStatus.CONFLICT, "User Already Exists!");
  }

  payload.password = await hashedPassword.createhas(payload.password!);
  payload.role = ENUM_USER_ROLE.SUPER_ADMIN;
  const newUser = await userService.insertUserToDB(payload);

  const refreshToken = await jwtHelpers.createToken(
    newUser,
    envconfig.refreshToken_expires!
  );
  const accessToken = await jwtHelpers.createToken(
    newUser,
    envconfig.expires_in!
  );

  return { refreshToken, accessToken };
};

const userSignin = async (payload: Partial<User>) => {
  const { email, password } = payload;
  const isUserExists = await userService.findByEmail(email!);

  if (!isUserExists) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exists!");
  }

  const isPasswordMatched = await hashedPassword.comparePassword(
    password!,
    isUserExists.password
  );

  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.FORBIDDEN, "Password does not match!");
  }

  const refreshToken = await jwtHelpers.createToken(
    isUserExists,
    envconfig.refreshToken_expires!
  );
  const accessToken = await jwtHelpers.createToken(
    isUserExists,
    envconfig.expires_in!
  );

  return { refreshToken, accessToken };
};

const changePassword = async (email: string, payload: IChangePassword) => {
  const { newPassword, oldPassword } = payload;
  const isUserExists = await userService.findByEmail(email!);

  if (!isUserExists) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exists!");
  }

  const isPasswordMatched = await hashedPassword.comparePassword(
    oldPassword!,
    isUserExists.password
  );

  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.FORBIDDEN, "Password does not match!");
  }
  const password = await hashedPassword.createhas(newPassword);

  const result = await userService.updateUserDataToDb(isUserExists.id, {
    password,
  });

  return result;
};

const getProfile = async (id: string) => {
  const result = await userService.getSingleUserToDb(id);

  return result;
};

const createAccessToken = async (id: string) => {
  const result = await userService.getSingleUserToDb(id);

  return result;
};

export const authService = {
  createNewUser,
  userSignin,
  getProfile,
  createAccessToken,
  changePassword,
};

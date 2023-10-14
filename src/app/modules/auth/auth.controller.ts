import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { authService } from "./auth.service";
import { User } from "@prisma/client";
import envconfig from "../../../config/envconfig";

const userSignup = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.createNewUser(req.body);

  const { refreshToken, accessToken } = result;

  const cookieOptions = {
    secure: envconfig.node_env === "production",
    httpOnly: true,
  };

  res.cookie("refreshToken", refreshToken, cookieOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User created Successufully!",
    data: {
      accessToken,
    },
  });
});

const userSignin = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.userSignin(req.body);

  const { refreshToken, accessToken } = result;

  const cookieOptions = {
    secure: envconfig.node_env === "production",
    httpOnly: true,
  };

  res.cookie("refreshToken", refreshToken, cookieOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Login Successufully!",
    data: {
      accessToken,
    },
  });
});

const getProfile = catchAsync(async (req: Request, res: Response) => {
  const user: Partial<User> = req.user as Partial<User>;
  const result = await authService.getProfile(user.id!);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "user received successufully",
    data: result,
  });
});

const changePassword = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.user!;
  const result = await authService.changePassword(email, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Password Change Successufully!",
    data: result,
  });
});

const getAccessToken = catchAsync(async (req: Request, res: Response) => {
  const user: Partial<User> = req.user as Partial<User>;
  const result = await authService.createAccessToken(user.id!);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Access Token Get successufully",
    data: result,
  });
});

export const authController = {
  userSignup,
  userSignin,
  getProfile,
  getAccessToken,
  changePassword,
};

import { NextFunction, Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { authService } from "./auth.service";
import { User } from "@prisma/client";
import envconfig from "../../../config/envconfig";
import { JwtPayload } from "jsonwebtoken";
import passport from "passport";
import { jwtHelpers } from "../../../utils/jwtHelpers";
import googleConfig from "../../../config/google.config";

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
      refreshToken,
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
  const { email }: JwtPayload = req.user!;
  const result = await authService.changePassword(email, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Password Change Successufully!",
    data: result,
  });
});

const getAccessToken = catchAsync(async (req: Request, res: Response) => {
  // const user: Partial<User> = req.user as Partial<User>;
  // const result = await authService.createAccessToken(user.id!);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Access Token Get successufully",
    // data: result,
  });
});

const changeUserRole = catchAsync(async (req: Request, res: Response) => {
  const { id, ...other } = req.body;

  const result = await authService.changeUserRole(id, other);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Role Update successufully",
    data: result,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.body;

  const result = await authService.deleteUser(email);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "user Delete Successfully successufully",
    data: result,
  });
});

const googleCallBack = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("google", async (error: Error, user: User) => {
      const accessToken = await jwtHelpers.createToken(
        user,
        envconfig.expires_in!
      );

      const redirectUrl = `${envconfig.client_url}?token=${accessToken}`;
      res.redirect(redirectUrl);
    })(req, res, next);
  }
);

const googleLoginUrl = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { clientID, callbackURL } = googleConfig;
    const authenticationURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientID}&redirect_uri=${callbackURL}&response_type=code&scope=email%20profile`;

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "user Delete Successfully successufully",
      data: authenticationURL,
    });
  }
);

export const authController = {
  userSignup,
  userSignin,
  getProfile,
  getAccessToken,
  changePassword,
  changeUserRole,
  deleteUser,
  googleCallBack,
  googleLoginUrl,
};

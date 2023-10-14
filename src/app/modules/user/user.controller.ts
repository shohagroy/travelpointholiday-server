import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { userService } from "./user.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { User } from "@prisma/client";

const getAllUser = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.getAllUserToDb();
  sendResponse<Partial<User>[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "users retrieved successfully",
    data: result,
  });
});

const getSingle = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.user!;
  const result = await userService.getSingleUserToDb(id);
  sendResponse<Partial<User>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User retrieved Successfully!",
    data: result,
  });
});

const updateUserInfo = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.user!;
  const updatedData = req.body;

  const result = await userService.updateUserDataToDb(id, updatedData);
  sendResponse<Partial<User>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Updated Successfully!",
    data: result,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await userService.deleteUserToDb(id);
  sendResponse<Partial<User>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "user deleted successfully",
    data: result,
  });
});

export const userController = {
  getAllUser,
  getSingle,
  updateUserInfo,
  deleteUser,
};

import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import pick from "../../../shared/pick";
import { paginationFields } from "../../../constants/pagination";
import { banarService } from "./banar.service";

const createbanar = catchAsync(async (req: Request, res: Response) => {
  const result = await banarService.createNewBanar(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Banar created Successufully!",
    data: result,
  });
});

const updateBanar = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await banarService.updateBanar(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Banar Update Successufully!",
    data: result,
  });
});

const getAllBanar = catchAsync(async (req: Request, res: Response) => {
  const result = await banarService.getAllBanar();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Banar received Successufully!",
    data: result,
  });
});

const deleteById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedData = req.body;
  const result = await banarService.deleteById(id, deletedData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Banar Delete Successufully!",
    data: result,
  });
});

export const banarController = {
  createbanar,
  updateBanar,
  getAllBanar,
  deleteById,
};

import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import pick from "../../../shared/pick";
import { paginationFields } from "../../../constants/pagination";
import ApiError from "../../../errors/ApiError";
import { cityService } from "./city.service";
import { cityFilterableFields } from "./city.constans";

const createCity = catchAsync(async (req: Request, res: Response) => {
  const isAlreadyExist = await cityService.isAlreadyExist(req.body);

  if (isAlreadyExist) {
    throw new ApiError(httpStatus.CONFLICT, "City already exist!");
  }

  const result = await cityService.createNewCity(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "City created Successufully!",
    data: result,
  });
});

const updateCity = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await cityService.updateCity(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "City Update Successufully!",
    data: result,
  });
});

const getALlCity = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationFields);
  const filters = pick(req.query, cityFilterableFields);
  const result = await cityService.getAllCity(paginationOptions, filters);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cities received Successufully!",
    meta: result.meta,
    data: result.data,
  });
});

const getById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await cityService.getById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "City received Successufully!",
    data: result,
  });
});

const getAllData = catchAsync(async (req: Request, res: Response) => {
  const result = await cityService.getAllData();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cities All Data received Successufully!",
    data: result,
  });
});

const deleteById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await cityService.deleteById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "City Delete Successufully!",
    data: result,
  });
});

export const cityController = {
  createCity,
  updateCity,
  getALlCity,
  getById,
  deleteById,
  getAllData,
};

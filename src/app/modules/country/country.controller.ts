import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import pick from "../../../shared/pick";
import { paginationFields } from "../../../constants/pagination";
import ApiError from "../../../errors/ApiError";
import { countryService } from "./country.service";
import { countryFilterableFields } from "./country.constans";

const createCountry = catchAsync(async (req: Request, res: Response) => {
  const isAlreadyExist = await countryService.isAlreadyExist(req.body);

  if (isAlreadyExist) {
    throw new ApiError(httpStatus.CONFLICT, "Country already exist!");
  }

  const result = await countryService.createNewCountry(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Country created Successufully!",
    data: result,
  });
});

const updateCountry = catchAsync(async (req: Request, res: Response) => {
  const isAlreadyExist = await countryService.isAlreadyExist(req.body);

  if (isAlreadyExist) {
    throw new ApiError(httpStatus.CONFLICT, "Country already exist!");
  }

  const { id } = req.params;
  const result = await countryService.updateCountry(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Country Update Successufully!",
    data: result,
  });
});

const getAllCountry = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationFields);
  const filters = pick(req.query, countryFilterableFields);
  const result = await countryService.getAllCountry(paginationOptions, filters);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Countries received Successufully!",
    meta: result.meta,
    data: result.data,
  });
});

const getById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await countryService.getById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Country received Successufully!",
    data: result,
  });
});

const deleteById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await countryService.deleteById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Country Delete Successufully!",
    data: result,
  });
});

export const countryController = {
  createCountry,
  updateCountry,
  getAllCountry,
  getById,
  deleteById,
};

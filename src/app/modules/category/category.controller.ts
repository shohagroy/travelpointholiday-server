import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { categoryService } from "./category.service";
import pick from "../../../shared/pick";
import { paginationFields } from "../../../constants/pagination";
import { categoryFilterableFields } from "./category.constans";
import ApiError from "../../../errors/ApiError";

const createCategory = catchAsync(async (req: Request, res: Response) => {
  const isAlreadyExist = await categoryService.isAlreadyExist(req.body);

  if (isAlreadyExist) {
    throw new ApiError(httpStatus.CONFLICT, "Category already exist!");
  }

  const result = await categoryService.createNewCategory(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Category created Successufully!",
    data: result,
  });
});

const updateCategory = catchAsync(async (req: Request, res: Response) => {
  const isAlreadyExist = await categoryService.isAlreadyExist(req.body);

  if (isAlreadyExist) {
    throw new ApiError(httpStatus.CONFLICT, "Category already exist!");
  }

  const { id } = req.params;
  const result = await categoryService.updateCategory(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Category Update Successufully!",
    data: result,
  });
});

const getAllCategory = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationFields);
  const filters = pick(req.query, categoryFilterableFields);
  const result = await categoryService.getALlCategory(
    paginationOptions,
    filters
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Categories received Successufully!",
    meta: result.meta,
    data: result.data,
  });
});

const getById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await categoryService.getById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Category received Successufully!",
    data: result,
  });
});

const deleteById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await categoryService.deleteById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Category Delete Successufully!",
    data: result,
  });
});

const getAllCategoryData = catchAsync(async (req: Request, res: Response) => {
  const result = await categoryService.getAllCategoryData();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Categories received Successufully!",
    data: result,
  });
});

export const categoryController = {
  createCategory,
  updateCategory,
  getAllCategory,
  getById,
  deleteById,
  getAllCategoryData,
};

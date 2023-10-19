import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import pick from "../../../shared/pick";
import { paginationFields } from "../../../constants/pagination";
import { attractionService } from "./attraction.service";
import { attractionFilterableFields } from "./attraction.constans";

const createNewAttraction = catchAsync(async (req: Request, res: Response) => {
  const { images, ...other } = req.body;
  other["price"] = Number(other.price);

  const result = await attractionService.createNewAttraction(images, other);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Attraction created Successufully!",
    data: result,
  });
});

const getAllAttraction = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationFields);
  const filters = pick(req.query, attractionFilterableFields);
  const result = await attractionService.getALlAttraction(
    paginationOptions,
    filters
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Attraction received Successufully!",
    meta: result.meta,
    data: result.data,
  });
});

const getById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await attractionService.getById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Attraction received Successufully!",
    data: result,
  });
});

const deleteById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await attractionService.deleteAttraction(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Attraction Delete Successufully!",
    data: result,
  });
});

const updateById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const { images, country, city, category, ...updatedData } = req.body;

  const result = await attractionService.updateById(id, updatedData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Attraction Updates Successufully!",
    data: result,
  });
});

const removeImage = catchAsync(async (req: Request, res: Response) => {
  const result = await attractionService.removeImage(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Attraction Image Removed Successufully!",
    data: result,
  });
});

const uploadNewImage = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await attractionService.uploadNewImage(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Attraction Image Update Successufully!",
    data: result,
  });
});

export const attractionController = {
  createNewAttraction,
  getAllAttraction,
  deleteById,
  getById,
  updateById,
  removeImage,
  uploadNewImage,
};

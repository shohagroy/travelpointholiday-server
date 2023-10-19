import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import pick from "../../../shared/pick";
import { paginationFields } from "../../../constants/pagination";
import { reviewService } from "./reivew.service";
import { JwtPayload } from "jsonwebtoken";

const createNewReview = catchAsync(async (req: Request, res: Response) => {
  const { id }: JwtPayload = req.user!;

  req.body["userId"] = id;

  const result = await reviewService.createNewReview(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "review created Successufully!",
    data: result,
  });
});

const updateReview = catchAsync(async (req: Request, res: Response) => {
  const id = "kjh";
  const result = await reviewService.updateReview(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review Update Successufully!",
    data: result,
  });
});

const getAllReviews = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationFields);
  const result = await reviewService.getAllReviews(paginationOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Reviews received Successufully!",
    meta: result.meta,
    data: result.data,
  });
});

const getAttractionReviews = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const paginationOptions = pick(req.query, paginationFields);
  const result = await reviewService.getAttractionReviews(
    id,
    paginationOptions
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Attraction Reviews received Successufully!",
    meta: result.meta,
    data: result.data,
  });
});

const getUserReviews = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const paginationOptions = pick(req.query, paginationFields);
  const result = await reviewService.getUserReviews(paginationOptions, id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Reviews received Successufully!",
    meta: result.meta,
    data: result.data,
  });
});

const deleteById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await reviewService.deleteById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review Delete Successufully!",
    data: result,
  });
});

export const reviewController = {
  createNewReview,
  updateReview,
  getAllReviews,
  getAttractionReviews,
  getUserReviews,
  deleteById,
};

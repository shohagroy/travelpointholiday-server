import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { bookingService } from "./booking.service";
import { attractionService } from "../attraction/attraction.service";
import { AttractionBooking } from "@prisma/client";
import pick from "../../../shared/pick";
import { paginationFields } from "../../../constants/pagination";
import { bookingFilterableFields } from "./booking.constans";
import { JwtPayload } from "jsonwebtoken";

const createBooking = catchAsync(async (req: Request, res: Response) => {
  const { attractionId, totalTicket, userId } = req.body;
  const attractionInfo = await attractionService.getById(attractionId);
  const payment = attractionInfo?.price! * Number(totalTicket);

  const bookingInfo = {
    userId,
    attractionId: attractionInfo!.id,
    payment,
    totalTicket: Number(totalTicket),
  };

  const result = await bookingService.createBooking(
    bookingInfo as AttractionBooking
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Attraction Booking Successufully!",
    data: result,
  });
});

const getUserBookingList = catchAsync(async (req: Request, res: Response) => {
  const { id }: JwtPayload = req.user!;

  const paginationOptions = pick(req.query, paginationFields);
  const result = await bookingService.getUserBookingList(paginationOptions, id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Booking list get Successufully!",
    data: result,
  });
});

const getALlBooking = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationFields);
  const filters = pick(req.query, bookingFilterableFields);
  const result = await bookingService.getAllBooking(paginationOptions, filters);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking lists get Successufully!",
    data: result,
  });
});

const bookingCancel = catchAsync(async (req: Request, res: Response) => {
  const { id, totalTicket } = req.body;
  const result = await bookingService.bookingCancel(id, totalTicket);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking Cancel Successufully!",
    data: result,
  });
});

const refundConfirm = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.body;

  const result = await bookingService.refundConfirm(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Refund Request Confirm Successufully!",
    data: result,
  });
});

const refundCancel = catchAsync(async (req: Request, res: Response) => {
  const { id, totalTicket } = req.body;

  const result = await bookingService.bookingCancel(id, totalTicket);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking Cancel Successufully!",
    data: result,
  });
});

const cancelBookingAndRefund = async (req: Request, res: Response) => {
  const { id, totalTicket } = req.body;

  const result = await bookingService.cancelBookingAndRefund(id, totalTicket);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking Cancel and Refund Successufully!",
    data: result,
  });
};

export const bookingController = {
  createBooking,
  getUserBookingList,
  getALlBooking,
  bookingCancel,
  refundCancel,
  refundConfirm,
  cancelBookingAndRefund,
};

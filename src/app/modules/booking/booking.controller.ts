import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { bookingService } from "./booking.service";
import { attractionService } from "../attraction/attraction.service";
import { AttractionBooking } from "@prisma/client";

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
  const result = await bookingService.getUserBookingList(req.user!.userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Booking list get Successufully!",
    data: result,
  });
});

const getALlBooking = catchAsync(async (req: Request, res: Response) => {
  const result = await bookingService.getAllBooking();
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

export const bookingController = {
  createBooking,
  getUserBookingList,
  getALlBooking,
  bookingCancel,
};

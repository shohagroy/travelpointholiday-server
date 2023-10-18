import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { cartService } from "./cart.service";

const addToCart = catchAsync(async (req: Request, res: Response) => {
  req.body["userId"] = req?.user!.id;

  let result;

  const isAlreadyExits = await cartService.findUnique(req.body);

  if (!isAlreadyExits) {
    result = await cartService.addToCart(req.body);
  } else {
    result = await cartService.addCartItemsQuantity(isAlreadyExits);
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Attraction Add to Cart Successufully!",
    data: result,
  });
});

const removeCartItemsQuantity = catchAsync(
  async (req: Request, res: Response) => {
    req.body["userId"] = req?.user!.id;
    req.body["totalTicket"] = 1;

    let result;

    const isAlreadyExits = await cartService.findUnique(req.body);

    if (isAlreadyExits?.totalTicket === 1) {
      result = await cartService.removeToCart(isAlreadyExits?.id);
    } else {
      result = await cartService.removeCartItemsQuantity(req.body);
    }

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Attraction Remove to Cart Successufully!",
      data: result,
    });
  }
);

const removeToCart = catchAsync(async (req: Request, res: Response) => {
  const result = await cartService.removeToCart(req.body.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Attraction Remove from Cart Successufully!",
    data: result,
  });
});

const getUserCart = catchAsync(async (req: Request, res: Response) => {
  const result = await cartService.getUserCart(req.user!.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Cartlist received Successufully!",
    data: result,
  });
});

export const cartController = {
  addToCart,
  removeToCart,
  getUserCart,
  removeCartItemsQuantity,
};

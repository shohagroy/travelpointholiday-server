import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import ApiError from "../../errors/ApiError";
import handleValidationError from "../../errors/handleValidationError";

import { Prisma } from "@prisma/client";
import handleClientError from "../../errors/handleClientError";
import { IGenericErrorMessage } from "../../interfaces/error";
import envconfig from "../../config/envconfig";

const globalErrorHandler: ErrorRequestHandler = (
  error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  envconfig.node_env === "development" &&
    console.log(`🐱‍🏍 globalErrorHandler`, { error });

  let statusCode = 500;
  let message = "Something went wrong !";
  let errorMessages: IGenericErrorMessage[] = [];

  if (error instanceof Prisma.PrismaClientValidationError) {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const simplifiedError = handleClientError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error.message;
    errorMessages = error?.message
      ? [
          {
            path: "",
            message: error?.message,
          },
        ]
      : [];
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: "",
            message: error?.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: envconfig.node_env === "development" ? error?.stack : undefined,
  });
};

export default globalErrorHandler;

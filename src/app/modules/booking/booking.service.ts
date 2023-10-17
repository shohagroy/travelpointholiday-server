import { AttractionBooking, Prisma } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IBookingFilters } from "./booking.interface";

const createBooking = async (
  payload: AttractionBooking
): Promise<AttractionBooking> => {
  const result = await prisma.$transaction(async (transactionClient) => {
    const bookingInfo = await transactionClient.attractionBooking.create({
      data: payload,
    });

    await transactionClient.attractions.update({
      where: {
        id: payload.attractionId,
      },
      data: {
        totalSeat: {
          decrement: payload?.totalTicket,
        },
        bookingSeat: {
          increment: payload?.totalTicket,
        },
      },
    });

    return bookingInfo;
  });

  return result;
};

const getAllBooking = async (
  paginationOptions: IPaginationOptions,
  filters: IBookingFilters
) => {
  const { size, page, skip } =
    paginationHelpers.calculatePagination(paginationOptions);
  const { cancel, refund } = filters;

  const andConditions = [];

  if (cancel && !refund) {
    andConditions.push({
      OR: [
        {
          status: {
            equals: "cancel",
          },
          refundStatus: {
            equals: false,
          },
        },
      ],
    });
  }

  if (refund) {
    andConditions.push({
      OR: [
        {
          status: {
            equals: "cancel",
          },
          refundStatus: {
            equals: true,
          },
        },
      ],
    });
  }

  const whereConditions: Prisma.AttractionBookingWhereInput | {} =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.attractionBooking.findMany({
    where: whereConditions,
    skip,
    take: size,
    orderBy:
      paginationOptions.sortBy && paginationOptions.sortOrder
        ? {
            [paginationOptions?.sortBy]: paginationOptions?.sortOrder,
          }
        : {
            createdAt: "desc",
          },

    include: {
      userInfo: true,
      attraction: {
        include: {
          images: true,
        },
      },
    },
  });

  const total = await prisma.attractionBooking.count({
    where: whereConditions,
  });

  return {
    meta: {
      total,
      page,
      size,
    },
    data: result,
  };
};

const getUserBookingList = async (
  paginationOptions: IPaginationOptions,
  userId: string
) => {
  const { size, page, skip } =
    paginationHelpers.calculatePagination(paginationOptions);
  const result = await prisma.attractionBooking.findMany({
    where: {
      userId,
    },
    skip,
    take: size,
    orderBy:
      paginationOptions.sortBy && paginationOptions.sortOrder
        ? {
            [paginationOptions?.sortBy]: paginationOptions?.sortOrder,
          }
        : {
            createdAt: "desc",
          },

    include: {
      userInfo: true,
      attraction: {
        include: {
          images: true,
        },
      },
    },
  });

  return result;
};

const bookingCancel = async (id: string, totalTicket: number) => {
  const result = await prisma.$transaction(async (transactionClient) => {
    const bookingInfo = await transactionClient.attractionBooking.update({
      where: {
        id,
      },
      data: {
        status: "cancel",
        refundStatus: false,
      },
    });

    await transactionClient.attractions.update({
      where: {
        id: bookingInfo.attractionId,
      },
      data: {
        totalSeat: {
          increment: totalTicket,
        },
        bookingSeat: {
          decrement: totalTicket,
        },
      },
    });

    return bookingInfo;
  });

  return result;
};

const refundCancel = async (id: string, totalTicket: number) => {
  const result = await prisma.$transaction(async (transactionClient) => {
    const bookingInfo = await transactionClient.attractionBooking.update({
      where: {
        id,
      },
      data: {
        status: "booked",
        refundStatus: false,
      },
    });

    await transactionClient.attractions.update({
      where: {
        id: bookingInfo.attractionId,
      },
      data: {
        totalSeat: {
          decrement: totalTicket,
        },
        bookingSeat: {
          increment: totalTicket,
        },
      },
    });

    return bookingInfo;
  });

  return result;
};

const refundConfirm = async (id: string) => {
  const result = await prisma.$transaction(async (transactionClient) => {
    const bookingInfo = await transactionClient.attractionBooking.update({
      where: {
        id,
      },
      data: {
        status: "cancel",
        refundStatus: true,
      },
    });

    return bookingInfo;
  });

  return result;
};

export const bookingService = {
  createBooking,
  getUserBookingList,
  getAllBooking,
  bookingCancel,
  refundCancel,
  refundConfirm,
};

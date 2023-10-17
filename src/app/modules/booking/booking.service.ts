import { AttractionBooking } from "@prisma/client";
import prisma from "../../../shared/prisma";

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

const getAllBooking = async () => {
  const result = await prisma.attractionBooking.findMany({
    include: {
      userInfo: true,
      attraction: true,
    },
  });

  return result;
};

const getUserBookingList = async (userId: string) => {
  const result = await prisma.attractionBooking.findMany({
    where: {
      userId,
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

export const bookingService = {
  createBooking,
  getUserBookingList,
  getAllBooking,
  bookingCancel,
};

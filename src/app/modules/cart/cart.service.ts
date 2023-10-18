import { UserCart } from "@prisma/client";
import prisma from "../../../shared/prisma";

const addToCart = async (payload: UserCart): Promise<UserCart> => {
  const result = await prisma.userCart.create({
    data: payload,
  });

  return result;
};

const removeToCart = async (id: string): Promise<UserCart> => {
  const result = await prisma.userCart.delete({
    where: {
      id,
    },
  });

  return result;
};

const addCartItemsQuantity = async (payload: UserCart): Promise<UserCart> => {
  const result = await prisma.userCart.update({
    where: {
      id: payload.id,
    },
    data: {
      totalTicket: {
        increment: 1,
      },
    },
  });

  return result;
};

const removeCartItemsQuantity = async (
  payload: UserCart
): Promise<UserCart> => {
  const result = await prisma.userCart.update({
    where: {
      id: payload.id,
    },
    data: {
      totalTicket: {
        decrement: payload.totalTicket,
      },
    },
  });

  return result;
};

const getUserCart = async (id: string): Promise<UserCart[]> => {
  const result = await prisma.userCart.findMany({
    where: {
      userId: id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return result;
};

const findUnique = async (
  payload: Partial<UserCart>
): Promise<UserCart | null> => {
  const result = await prisma.userCart.findFirst({
    where: {
      userId: payload.userId,
      attractionId: payload.attractionId,
    },
  });

  return result;
};

export const cartService = {
  addToCart,
  removeToCart,
  getUserCart,
  findUnique,
  addCartItemsQuantity,
  removeCartItemsQuantity,
};

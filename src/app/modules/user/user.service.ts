import { User } from "@prisma/client";
import prisma from "../../../shared/prisma";

const getAllUserToDb = async (): Promise<Partial<User>[]> => {
  const result = await prisma.user.findMany({});

  return result;
};

const getSingleUserToDb = async (id: string): Promise<Partial<User | null>> => {
  const result = await prisma.user.findFirst({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      contact: true,
      address: true,
      gender: true,
      profileImg: {
        select: {
          url: true,
        },
      },
      createdAt: true,
      updatedAt: true,
    },
  });

  return result;
};

const updateUserDataToDb = async (
  id: string,
  payload: Partial<User>
): Promise<Partial<User | null>> => {
  const result = await prisma.user.update({
    where: {
      id,
    },
    data: payload,
    include: {
      profileImg: true,
    },
  });

  return result;
};

const deleteUserToDb = async (id: string): Promise<Partial<User | null>> => {
  const result = await prisma.user.delete({
    where: {
      id,
    },
  });

  return result;
};

const findByEmail = async (email: string): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    include: {
      profileImg: true,
    },
  });

  return user;
};

const insertUserToDB = async (data: User): Promise<User> => {
  const result = await prisma.user.create({
    data,
  });

  return result;
};

export const userService = {
  findByEmail,
  insertUserToDB,
  getAllUserToDb,
  getSingleUserToDb,
  updateUserDataToDb,
  deleteUserToDb,
};

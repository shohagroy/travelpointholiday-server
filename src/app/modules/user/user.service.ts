import { Avatar, User } from "@prisma/client";
import prisma from "../../../shared/prisma";
import imagesUpload from "../../../helpers/imagesUpload";
import deletedImages from "../../../helpers/deletedImages";

const getAllUserToDb = async (): Promise<Partial<User>[]> => {
  const result = await prisma.user.findMany({
    include: {
      profileImg: true,
    },
  });

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
          id: true,
          public_id: true,
          secure_url: true,
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

const updateUserAvatar = async (
  id: string,
  payload: string[]
): Promise<Avatar> => {
  const avatarImage = await imagesUpload(payload);

  const isAlreadyExist = await prisma.avatar.findUnique({
    where: {
      userId: id,
    },
  });

  if (isAlreadyExist) {
    await deletedImages([isAlreadyExist]);
    const result = await prisma.avatar.update({
      where: {
        userId: id,
      },
      data: {
        secure_url: avatarImage[0].secure_url,
        public_id: avatarImage[0].public_id,
      },
    });

    return result;
  }

  const result = await prisma.avatar.create({
    data: {
      secure_url: avatarImage[0].secure_url,
      public_id: avatarImage[0].public_id,
      userId: id,
    },
  });

  return result;
};

const deleteUserToDb = async (data: {
  id: string;
  avatarId: string;
}): Promise<Partial<User | null>> => {
  const result = prisma.$transaction(async (transactionClient) => {
    await transactionClient.avatar.delete({
      where: {
        id: data.avatarId,
      },
    });

    const userInfo = await transactionClient.user.delete({
      where: {
        id: data.id,
      },
    });

    return userInfo;
  });

  return result;
};

const findByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    include: {
      profileImg: {
        select: {
          id: true,
          public_id: true,
          secure_url: true,
        },
      },
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
  updateUserAvatar,
};

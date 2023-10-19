import { Avatar, Prisma, User } from "@prisma/client";
import prisma from "../../../shared/prisma";
import imagesUpload from "../../../helpers/imagesUpload";
import deletedImages from "../../../helpers/deletedImages";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IUserFilters } from "./user.interface";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { userSearchableFields } from "./user.constants";

const getAllUserToDb = async (
  paginationOptions: IPaginationOptions,
  filters: IUserFilters
) => {
  const { size, page, skip } =
    paginationHelpers.calculatePagination(paginationOptions);
  const { search, ...filterData } = filters;

  const andConditions = [];

  if (search) {
    andConditions.push({
      OR: userSearchableFields.map((field) => ({
        [field]: {
          contains: search,
          mode: "insensitive",
        },
      })),
    });
  }
  if (filterData) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => {
        if (key === "role") {
          return {
            role: {
              equals: filterData[key],
            },
          };
        }
      }),
    });
  }

  const whereConditions: Prisma.UserWhereInput | {} =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.user.findMany({
    where: whereConditions,
    include: {
      profileImg: true,
    },
    take: size,
    skip,
  });

  const total = await prisma.user.count({
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
    if (data?.avatarId !== "undifine") {
      await transactionClient.avatar.delete({
        where: {
          id: data.avatarId,
        },
      });
    }

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
  const result = await prisma.$transaction(async (transactionClient) => {
    const userInfo = await transactionClient.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: data.password,
        role: data.role,
      },
    });

    if (data?.avatarId) {
      await transactionClient.avatar.create({
        data: {
          secure_url: data.avatarId,
          public_id: "google_img",
          userId: userInfo.id,
        },
      });
    }
    return userInfo;
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

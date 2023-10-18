import { Review } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { paginationHelpers } from "../../../helpers/paginationHelper";

const createNewReview = async (payload: Review): Promise<Review> => {
  const result = await prisma.review.create({
    data: payload,
  });

  return result;
};

const updateReview = async (
  id: string,
  payload: Partial<Review>
): Promise<Review> => {
  const result = await prisma.review.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const getAllReviews = async (paginationOptions: IPaginationOptions) => {
  const { size, page, skip } =
    paginationHelpers.calculatePagination(paginationOptions);

  const result = await prisma.review.findMany({
    skip,
    take: size,
    orderBy:
      paginationOptions.sortBy && paginationOptions.sortOrder
        ? { [paginationOptions.sortBy]: paginationOptions.sortOrder }
        : {
            createdAt: "desc",
          },
  });

  const total = await prisma.country.count({});

  return {
    meta: {
      total,
      page,
      size,
    },
    data: result,
  };
};
const getAttractionReviews = async (
  id: string,
  paginationOptions: IPaginationOptions
) => {
  const { size, page, skip } =
    paginationHelpers.calculatePagination(paginationOptions);

  const result = await prisma.review.findMany({
    where: {
      attractionId: id,
    },
    include: {
      user: {
        include: {
          profileImg: true,
        },
      },
    },
    skip,
    take: size,
    orderBy:
      paginationOptions.sortBy && paginationOptions.sortOrder
        ? { [paginationOptions.sortBy]: paginationOptions.sortOrder }
        : {
            createdAt: "desc",
          },
  });

  const total = await prisma.review.count({
    where: {
      attractionId: id,
    },
  });

  const reviewData = result.map((review) => {
    return {
      ...review,
      user: {
        name: review.user.name,
        address: review.user.address,
        profileImg: review.user.profileImg?.secure_url || "",
      },
    };
  });

  return {
    meta: {
      total,
      page,
      size,
    },
    data: reviewData,
  };
};

const getUserReviews = async (
  paginationOptions: IPaginationOptions,
  id: string
) => {
  const { size, page, skip } =
    paginationHelpers.calculatePagination(paginationOptions);

  const result = await prisma.review.findMany({
    where: {
      userId: id,
    },
    include: {
      user: {
        include: {
          profileImg: true,
        },
      },
    },
    skip,
    take: size,
    orderBy:
      paginationOptions.sortBy && paginationOptions.sortOrder
        ? { [paginationOptions.sortBy]: paginationOptions.sortOrder }
        : {
            createdAt: "desc",
          },
  });

  const total = await prisma.review.count({
    where: {
      userId: id,
    },
  });

  const reviewData = result.map((review) => {
    return {
      ...review,
      user: {
        name: review.user.name,
        address: review.user.address,
        profileImg: review.user.profileImg?.secure_url || "",
      },
    };
  });

  return {
    meta: {
      total,
      page,
      size,
    },
    data: reviewData,
  };
};

const deleteById = async (id: string) => {
  const result = await prisma.review.delete({
    where: {
      id,
    },
  });

  return result;
};

export const reviewService = {
  createNewReview,
  updateReview,
  getAllReviews,
  getAttractionReviews,
  getUserReviews,
  deleteById,
};

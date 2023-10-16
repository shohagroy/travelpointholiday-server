import { Attractions, City, Country, Images, Prisma } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { ICityFilters } from "./attraction.interface";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { attractionSearchableFields } from "./attraction.constans";
import imagesUpload from "../../../helpers/imagesUpload";

const createNewAttraction = async (
  images: string[],
  payload: Attractions
): Promise<Attractions> => {
  const uploadedImages = await imagesUpload(images);

  const result = await prisma.$transaction(async (transactionClient) => {
    const attractionInfo = await transactionClient.attractions.create({
      data: payload,
    });

    const attractionimagesInfo = uploadedImages.map((image) => ({
      secure_url: image.secure_url,
      public_id: image.public_id,
      attractionId: attractionInfo.id,
    }));

    await transactionClient.images.createMany({
      data: attractionimagesInfo,
    });

    return attractionInfo;
  });

  return result;
};

const getALlAttraction = async (
  paginationOptions: IPaginationOptions,
  filters: ICityFilters
) => {
  const { size, page, skip } =
    paginationHelpers.calculatePagination(paginationOptions);

  const { search, ...filterData } = filters;

  const andConditions = [];

  if (search) {
    andConditions.push({
      OR: attractionSearchableFields.map((field) => ({
        [field]: {
          contains: search,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => {
        if (key === "categoryId") {
          return {
            categoryId: {
              equals: filterData[key],
            },
          };
        } else if (key === "countryId") {
          return {
            countryId: {
              equals: filterData[key],
            },
          };
        } else if (key === "cityId") {
          return {
            cityId: {
              equals: filterData[key],
            },
          };
        }
      }),
    });
  }

  const whereConditions: Prisma.AttractionsWhereInput | {} =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.attractions.findMany({
    where: whereConditions,
    include: {
      country: true,
      images: true,
      city: true,
      category: true,
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

  const total = await prisma.attractions.count({
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

export const attractionService = {
  createNewAttraction,
  getALlAttraction,
};

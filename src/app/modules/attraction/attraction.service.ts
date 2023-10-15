import { Attractions, City, Country, Images, Prisma } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { ICityFilters } from "./attraction.interface";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { citySearchableFields } from "./attraction.constans";
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

    console.log(attractionInfo);

    const attractionimagesInfo = uploadedImages.map((image) => ({
      secure_url: image.secure_url,
      public_id: image.public_id,
      attractionId: attractionInfo.id,
    }));

    console.log(attractionimagesInfo);

    await transactionClient.images.createMany({
      data: attractionimagesInfo,
    });

    return attractionInfo;
  });

  return result;
};

const Update = async (id: string, payload: Partial<Country>): Promise<City> => {
  const result = await prisma.city.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const getAllCity = async (
  paginationOptions: IPaginationOptions,
  filters: ICityFilters
) => {
  const { size, page, skip } =
    paginationHelpers.calculatePagination(paginationOptions);

  const { search, ...filterData } = filters;

  const andConditions = [];

  if (search) {
    andConditions.push({
      OR: citySearchableFields.map((field) => ({
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
        if (key === "countryId") {
          return {
            country: {
              id: {
                in: [filterData[key]],
              },
            },
          };
        }
      }),
    });
  }

  const whereConditions: Prisma.CityWhereInput | {} =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.city.findMany({
    where: whereConditions,
    include: {
      country: true,
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

  const total = await prisma.city.count({
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

const getById = async (id: string) => {
  const result = await prisma.city.findUnique({
    where: {
      id,
    },
  });

  return result;
};

const isAlreadyExist = async (payload: City) => {
  const result = await prisma.city.findUnique({
    where: {
      name: payload.name,
    },
  });

  return result;
};

const deleteById = async (id: string) => {
  const result = await prisma.city.delete({
    where: {
      id,
    },
  });

  return result;
};

export const attractionService = {
  createNewAttraction,
};

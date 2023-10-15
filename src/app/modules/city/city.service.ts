import { City, Country, Prisma } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { ICityFilters } from "./city.interface";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { citySearchableFields } from "./city.constans";

const createNewCity = async (payload: City): Promise<City> => {
  const result = await prisma.city.create({
    data: payload,
  });

  return result;
};

const updateCity = async (
  id: string,
  payload: Partial<Country>
): Promise<City> => {
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

  const whereConditions: Prisma.CityWhereInput | {} =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.city.findMany({
    where: whereConditions,
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

export const cityService = {
  createNewCity,
  updateCity,
  getAllCity,
  getById,
  deleteById,
  isAlreadyExist,
};

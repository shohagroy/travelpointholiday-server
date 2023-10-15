import { Category, Country, Prisma } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { ICountryFilters } from "./country.interface";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { countrySearchableFields } from "./country.constans";

const createNewCountry = async (payload: Country): Promise<Country> => {
  const result = await prisma.country.create({
    data: payload,
  });

  return result;
};

const updateCountry = async (
  id: string,
  payload: Partial<Country>
): Promise<Country> => {
  const result = await prisma.country.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const getAllCountry = async (
  paginationOptions: IPaginationOptions,
  filters: ICountryFilters
) => {
  const { size, page, skip } =
    paginationHelpers.calculatePagination(paginationOptions);

  const { search, ...filterData } = filters;

  const andConditions = [];

  if (search) {
    andConditions.push({
      OR: countrySearchableFields.map((field) => ({
        [field]: {
          contains: search,
          mode: "insensitive",
        },
      })),
    });
  }

  const whereConditions: Prisma.CountryWhereInput | {} =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.country.findMany({
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

  const total = await prisma.country.count({
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
  const result = await prisma.country.findUnique({
    where: {
      id,
    },
  });

  return result;
};

const isAlreadyExist = async (payload: Category) => {
  const result = await prisma.country.findUnique({
    where: {
      name: payload.name,
    },
  });

  return result;
};

const deleteById = async (id: string) => {
  const result = await prisma.country.delete({
    where: {
      id,
    },
  });

  return result;
};

const getAllData = async () => {
  const result = await prisma.country.findMany();

  return result;
};

export const countryService = {
  createNewCountry,
  updateCountry,
  getAllCountry,
  getById,
  deleteById,
  isAlreadyExist,
  getAllData,
};

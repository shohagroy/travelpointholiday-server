import { Category, Prisma } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { ICategoryFilters } from "./category.interface";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { categorySearchableFields } from "./category.constans";

const createNewCategory = async (payload: Category): Promise<Category> => {
  const result = await prisma.category.create({
    data: payload,
  });

  return result;
};

const updateCategory = async (id: string, payload: Partial<Category>) => {
  console.log(payload);
  const result = await prisma.category.update({
    where: {
      id,
    },
    data: payload,
  });

  console.log(result);
  return result;
};

const getALlCategory = async (
  paginationOptions: IPaginationOptions,
  filters: ICategoryFilters
) => {
  const { size, page, skip } =
    paginationHelpers.calculatePagination(paginationOptions);

  const { search, ...filterData } = filters;

  const andConditions = [];

  if (search) {
    andConditions.push({
      OR: categorySearchableFields.map((field) => ({
        [field]: {
          contains: search,
          mode: "insensitive",
        },
      })),
    });
  }

  // if (Object.keys(filterData).length > 0) {
  //   andConditions.push({
  //     AND: Object.keys(filterData).map((key) => {
  //       if (key === "category") {
  //         return {
  //           category: {
  //             id: {
  //               in: [filterData[key]],
  //             },
  //           },
  //         };
  //       } else if (key === "minPrice") {
  //         return {
  //           price: {
  //             gte: parseFloat(filterData[key]!),
  //           },
  //         };
  //       } else if (key === "maxPrice") {
  //         return {
  //           price: {
  //             lte: parseFloat(filterData[key]!),
  //           },
  //         };
  //       }
  //     }),
  //   });
  // }

  const whereConditions: Prisma.CategoryWhereInput | {} =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.category.findMany({
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

  const total = await prisma.category.count({
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
  const result = await prisma.category.findUnique({
    where: {
      id,
    },
  });

  return result;
};

const isAlreadyExist = async (payload: Category) => {
  const result = await prisma.category.findUnique({
    where: {
      name: payload.name,
    },
  });

  return result;
};

const deleteById = async (id: string) => {
  const result = await prisma.category.delete({
    where: {
      id,
    },
  });

  return result;
};

export const categoryService = {
  createNewCategory,
  updateCategory,
  getALlCategory,
  getById,
  deleteById,
  isAlreadyExist,
};

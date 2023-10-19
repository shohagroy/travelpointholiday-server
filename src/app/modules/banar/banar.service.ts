import { Banar, Country } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { paginationHelpers } from "../../../helpers/paginationHelper";

const createNewBanar = async (payload: Banar): Promise<Banar> => {
  const result = await prisma.banar.create({
    data: payload,
  });

  return result;
};

const updateBanar = async (
  id: string,
  payload: Partial<Country>
): Promise<Banar> => {
  const result = await prisma.banar.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const getAllBanar = async (paginationOptions: IPaginationOptions) => {
  const { size, page, skip } =
    paginationHelpers.calculatePagination(paginationOptions);

  const result = await prisma.banar.findMany({
    skip,
    take: size,
  });

  const total = await prisma.banar.count({});

  return {
    meta: {
      total,
      page,
      size,
    },
    data: result,
  };
};

const deleteById = async (id: string) => {
  const result = await prisma.banar.delete({
    where: {
      id,
    },
  });

  return result;
};

export const banarService = {
  createNewBanar,
  updateBanar,
  getAllBanar,
  deleteById,
};

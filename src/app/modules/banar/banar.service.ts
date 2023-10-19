import { Banar } from "@prisma/client";
import prisma from "../../../shared/prisma";
import imagesUpload from "../../../helpers/imagesUpload";
import deletedImages from "../../../helpers/deletedImages";

const createNewBanar = async (payload: string[]) => {
  const uploadedImages = await imagesUpload(payload);

  const result = await prisma.banar.createMany({
    data: uploadedImages,
  });

  return result;
};

const updateBanar = async (
  id: string,
  payload: Partial<Banar>
): Promise<Banar> => {
  const result = await prisma.banar.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const getAllBanar = async () => {
  const result = await prisma.banar.findMany({});

  return result;
};

const deleteById = async (id: string, data: Banar) => {
  const result = await prisma.banar.delete({
    where: {
      id,
    },
  });
  await deletedImages([data]);

  return result;
};

export const banarService = {
  createNewBanar,
  updateBanar,
  getAllBanar,
  deleteById,
};

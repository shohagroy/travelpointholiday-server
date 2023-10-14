import bcrypt from "bcrypt";
import envconfig from "../config/envconfig";

const createhas = async (password: string): Promise<string> => {
  const hashedPassword = await bcrypt.hash(
    password,
    Number(envconfig.bycrypt_salt_rounds) || 10
  );
  return hashedPassword;
};

const comparePassword = async (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(givenPassword, savedPassword);
};

export const hashedPassword = {
  createhas,
  comparePassword,
};

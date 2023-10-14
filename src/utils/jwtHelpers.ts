import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import envconfig from "../config/envconfig";
import { User } from "@prisma/client";

const createToken = (user: Partial<User>, expiresIn: string): string => {
  const { id, name, email, role } = user;

  const payload = { id, name, email, role };

  return jwt.sign(payload, envconfig.secrect_token_key as Secret, {
    expiresIn,
  });
};

const verifyToken = (token: string, secret: Secret): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload;
};

export const jwtHelpers = {
  createToken,
  verifyToken,
};

import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import envconfig from "../config/envconfig";

const createToken = (user: JwtPayload, expiresIn: string): string => {
  const { id, name, email, role, profileImg } = user;

  const payload = { id, name, email, role, avatar: profileImg?.secure_url };

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

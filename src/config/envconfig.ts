import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  bycrypt_salt_rounds: Number(process.env.BYCRYPT_SALT_ROUND) || 10,
  secrect_token_key: process.env.SECTECT_TOKEN_KEY,
  expires_in: process.env.EXPIRES_IN,
  refreshToken_expires: process.env.REFRESHTOKEN_EXPIRES,
  client_url: process.env.CLIENT_URL,
};

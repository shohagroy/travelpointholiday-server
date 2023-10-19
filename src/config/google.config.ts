import { StrategyOptionsWithRequest } from "passport-google-oauth20";
import envconfig from "./envconfig";

export interface GoogleConfig {
  clientID: string | undefined;
  clientSecret: string | undefined;
  callbackURL: string | undefined;
}

const googleConfig = {
  clientID: envconfig.google_client_id!,
  clientSecret: envconfig.google_client_secret!,
  callbackURL:
    envconfig.google_call_back_url || "http://localhost:5000/auth/callback",
};

export default googleConfig;

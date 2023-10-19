import { compareSync, hashSync } from "bcrypt";
import { PassportStatic } from "passport";
// import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";
// import User from "../modules/user/user.interface";
import googleConfig from "./google.config";
import { userService } from "../app/modules/user/user.service";
import { Role, User } from "@prisma/client";

const passportConfig = (passport: PassportStatic) => {
  passport.use(
    new GoogleStrategy(googleConfig, async function (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      cb: Function
    ) {
      const { displayName, id, _json } = profile;

      const createDameEmail = `${id}@gmail.com`;

      try {
        const isUserExists = await userService.findByEmail(createDameEmail!);

        if (!isUserExists) {
          const userInfo = {
            email: createDameEmail!,
            name: displayName,
            password: hashSync(id, 10),
            role: Role.user,
            avatarId: _json.picture!,
          };

          const newUser = await userService.insertUserToDB(userInfo as User);
          return cb(null, newUser);
        }

        const userInfo = {
          name: displayName,
        };

        const newUpdatedUser = await userService.updateUserDataToDb(
          isUserExists?.id,
          userInfo
        );

        return cb(null, newUpdatedUser);
      } catch (error) {
        return cb(error, null);
      }
    })
  );

  passport.serializeUser(function (
    user: any,
    done: (err: any, email?: any) => void
  ) {
    done(null, user.email);
  });

  passport.deserializeUser(function (
    email: any,
    done: (err: any, user?: any) => void
  ) {
    userService
      .findByEmail(email)
      .then((user) => {
        done(null, user);
      })
      .catch((error: Error) => {
        done(error);
      });
  });
};

export default passportConfig;

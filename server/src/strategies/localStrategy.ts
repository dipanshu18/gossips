import { Strategy } from "passport-local";
import { db } from "../utils/db";
import { compareValue } from "../utils/bcrypt";
import passport from "passport";

passport.use(
  new Strategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      const user = await db.user.findFirst({
        where: { email },
      });

      if (!user)
        return done(null, false, {
          message: "Account not found. Kindly create one!",
        });

      if (user.provider && user.provider !== "EMAIL") {
        return done(null, false, {
          message: `You have signed up with ${user.provider}. Kindly login with that`,
        });
      }

      const isPasswordValid = await compareValue(password, user.password!);

      if (!isPasswordValid) {
        return done(null, false, { message: "Invalid credentials" });
      }

      return done(null, { ...user, password: "" });
    }
  )
);

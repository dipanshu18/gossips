import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import {
  GOOGLE_CALLBACK_URL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} from "../constants/env";
import { db } from "../utils/db";
import { oneYearFromNow } from "../utils/date";

passport.use(
  new Strategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      if (!profile.emails || !profile.photos) {
        return;
      }

      const existingUser = await db.user.findFirst({
        where: { email: profile?.emails[0].value },
      });

      if (existingUser) {
        return done(null, false, {
          message: "You have signed up with email-password",
        });
      }

      const newUser = await db.user.create({
        data: {
          email: profile.emails[0].value,
          name: profile.displayName,
          provider: "GOOGLE",
          providerId: profile.id,
          image: profile.photos[0].value ?? "",
        },
      });

      const verificationCode = await db.verificationCode.create({
        data: {
          expiresAt: oneYearFromNow(),
          type: "EMAIL_VERIFICATION",
          userId: newUser.id,
        },
      });

      // send a verification email

      return done(null, newUser);
    }
  )
);

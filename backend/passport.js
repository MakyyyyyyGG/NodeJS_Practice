import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import { query } from "./lib/db.js";
import { v4 as uuidv4 } from "uuid";

const configurePassport = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: "http://localhost:5000/auth/google/callback",
      },
      async function (accessToken, refreshToken, profile, done) {
        try {
          // Check if user exists
          const [existingUser] = await query(
            "SELECT * FROM users WHERE google_id = ?",
            [profile.id]
          );

          if (existingUser) {
            return done(null, existingUser);
          }

          // If user doesn't exist, create new user
          const user_uuid = uuidv4();
          const newUser = {
            user_id: user_uuid,
            google_id: profile.id,
            email: profile.emails[0].value,
            display_name: profile.displayName,
            profile_picture: profile.photos[0].value,
          };

          await query(
            "INSERT INTO users (user_id, google_id, email, display_name, profile_picture) VALUES (?, ?, ?, ?, ?)",
            [
              newUser.user_id,
              newUser.google_id,
              newUser.email,
              newUser.display_name,
              newUser.profile_picture,
            ]
          );

          done(null, newUser);
        } catch (error) {
          done(error, null);
        }
      }
    )
  );

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });
};

export default configurePassport;

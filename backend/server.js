import express, { json } from "express";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import passport from "passport";
import session from "express-session"; // Replace cookie-session with express-session
import configurePassport from "./passport.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Call the configurePassport function to set up the Google strategy
configurePassport();

// Use express-session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      secure: process.env.NODE_ENV === "production", // Set to true in production
      httpOnly: true,
      sameSite: "lax",
    },
    rolling: true, // Resets the cookie maxAge on every response
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["set-cookie"],
  })
);
// ---
app.get("/", (req, res) => {
  res.send("Hello from the backends");
});

// Routes hosts the API routes
app.use("/auth", authRoutes);

app.listen(5000, () => {
  console.log(`Server is running on port 5000`);
});

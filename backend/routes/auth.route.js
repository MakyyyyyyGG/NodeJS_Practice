import express from "express";
import { signup } from "../controllers/auth.controller.js";
import passport from "passport";
const router = express.Router();

//sample of using controller
router.get("/", signup);

// Add new route for Google authentication
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

//sample of using controller
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  function (req, res) {
    // Successful authentication
    req.session.save(() => {
      res.redirect(`http://localhost:5173/`);
    });
  }
);

// Add new route to get user data
router.get("/getuser", (req, res) => {
  if (req.user) {
    res.json({
      success: true,
      user: req.user,
    });
  } else {
    res.json({
      success: false,
      message: "Not authenticated",
    });
  }
});

// Add logout route
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("http://localhost:5173/");
  });
});

export default router;

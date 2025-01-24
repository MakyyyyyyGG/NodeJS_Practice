import express from "express";
import { postEvents } from "../controllers/events.controller.js";

const router = express.Router();

router.post("/post", postEvents);

export default router;

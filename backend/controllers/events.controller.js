import { query } from "../lib/db.js";
import { v4 as uuidv4 } from "uuid";

export const postEvents = async (req, res) => {
  console.log("body sent:", req.body);
};

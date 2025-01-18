import { query } from "../lib/db.js";
import { v4 as uuidv4 } from "uuid";

export const signup = async (req, res) => {
  console.log("body sent:", req.body);

  const user_uuid = uuidv4();
  // console.log("user uuidv4", user_uuid);

  try {
    // const rows = await query("INSERT INTO users (user_id, email, password) VALUES (?,?, ?)", [user_uuid ,req.body.email, req.body.password]);
    const users = await query("SELECT * FROM users");
    // If the query is successful, send a success response
    if (res.status(200)) {
      res.json(users);
      console.log("rows", users);
      console.log("User fetched successfully");
    } else {
      res.status(500).send("Error fetching user");
      console.log("Error fetching user");
    }
  } catch (error) {
    // Log and send error details for debugging
    console.log(error);
    res.status(500).send("Error fetching user");
  }
};

// // Add new route to get user data
// export const getUser = (req, res) => {
//   if (req.user) {
//     res.json({
//       success: true,
//       user: req.user,
//     });
//   } else {
//     res.json({
//       success: false,
//       message: "Not authenticated",
//     });
//   }
// };

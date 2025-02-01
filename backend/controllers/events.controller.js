import { query } from "../lib/db.js";
import { v4 as uuidv4 } from "uuid";

export const postEvents = async (req, res) => {
  console.log("body sent:", req.body);
  const { title, description, user_id, startDate, endDate } = req.body;

  const event_uuid = uuidv4();
  try {
    const queryResult = await query(
      "INSERT INTO events (event_id, title, user_id, description, start_date, end_date, created, updated) VALUES (?,?,?,?,?,?,NOW(),NOW())",
      [event_uuid, title, user_id, description, startDate, endDate]
    );

    if (queryResult.affectedRows === 1) {
      res.status(200).json({ queryResult });
      console.log("Event added successfully");
    } else {
      res.status(400).send("Error adding event");
      console.log("Error adding event");
    }
  } catch (error) {
    console.error("Error adding event:", error.message || error);
    res.status(500).send("Server error adding event");
  }
};

export const getEvents = async (req, res) => {
  try {
    const queryResult = await query("SELECT * FROM events");

    if (queryResult.length === 0) {
      res.status(404).send("No events found");
      console.log("No events found");
    } else {
      res.status(200).json(queryResult);
      console.log("Events fetched successfully");
    }
  } catch (error) {
    console.error("Error fetching events:", error.message || error);
    res.status(500).send("Internal server error while fetching events");
  }
};

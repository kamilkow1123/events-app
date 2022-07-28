import mongoose, { Schema } from "mongoose";
import { validateEmail } from "../utils/validators";

const eventSchema: Schema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    validate: [validateEmail, "Invalid email"],
  },
  eventDate: {
    type: Date,
    required: true,
  },
});

export default mongoose.model("Event", eventSchema);

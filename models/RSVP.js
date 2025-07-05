const mongoose = require("mongoose");

const rsvpSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    attendance: { type: String, enum: ["yes", "no"], required: true },
    guests: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("RSVP", rsvpSchema);

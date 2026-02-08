const mongoose = require("mongoose");

const rsvpSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    attendance: {
      type: String,
      enum: ["yes", "no"],
      required: true,
    },

    adults: {
      type: Number,
      min: 0,
      default: 0,
      required: function () {
        return this.attendance === "yes";
      },
    },

    kids: {
      type: Number,
      min: 0,
      default: 0,
      required: function () {
        return this.attendance === "yes";
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("RSVP", rsvpSchema);

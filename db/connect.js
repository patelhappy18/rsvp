const mongoose = require("mongoose");

const connectDB = (url) => {
  return mongoose.connect(url, {
    serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds instead of the default 30 seconds
  });
};

module.exports = connectDB;

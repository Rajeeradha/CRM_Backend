const mongoose = require("mongoose");

db = async () => {
  try {
    await mongoose.connect(process.env.URL);
    console.log("DB connection established.");
  } catch (error) {
    console.log("Error while connecting DB: ", error);
  }
};

module.exports = db;
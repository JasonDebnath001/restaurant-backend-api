const mongoose = require("mongoose");
const colors = require("colors");

//mongodb connection function
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `Connected to database ${mongoose.connection.host}`.bgWhite
    );
  } catch (error) {
    console.log("Db error" + error, colors.bgRed.white);
  }
};

module.exports = connectDb;

const express = require("express");
const colors = require("colors");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDb = require("./config/db");

// .env config
dotenv.config();

//DB connection
connectDb();

//rest object
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/user", require("./routes/userRoute"));

//port
app.get("/", (req, res) => {
  return res.status(200).send("<h1>Welcome To Server App</h1>");
});

app.listen(process.env.PORT, () => {
  console.log("Server is running".bgMagenta.white);
});

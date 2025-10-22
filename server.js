const express = require("express");

//rest object
const app = express();

//port
app.get("/", (req, res) => {
  return res.status(200).send("<h1>Welcome To Server App</h1>");
});

const PORT = 8000;

app.listen(PORT, () => {
  console.log("Server is running");
});

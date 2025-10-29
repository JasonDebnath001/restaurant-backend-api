const userModel = require("../models/userModel");

const registerController = async (req, res) => {
  try {
    const { username, email, phone, address, password } = req.body;
    //validation
    if (!username || !email || !password || !phone || !address)
      return res
        .status(500)
        .send({ success: false, message: "Please provide all fields" });

    //check user
    const existingUser = await userModel.findOne({ email });
    if (existingUser)
      res
        .status(200)
        .send({
          success: false,
          message: "Email already registered. Please login!",
        });
    //create new user
    const user = await userModel.create({
      username,
      email,
      password,
      address,
      phone,
    });

    res
      .status(201)
      .send({ success: true, message: "Account created successfully" });
  } catch (error) {
    console.log("Error in registering user" + error);
    res.status(500).send({ success: false, message: error.message });
  }
};

module.exports = { registerController };

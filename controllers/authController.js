const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
      res.status(200).send({
        success: false,
        message: "Email already registered. Please login!",
      });
    // hashing
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create new user
    const user = await userModel.create({
      username,
      email,
      password: hashedPassword,
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

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password)
      return res
        .status(500)
        .send({ success: false, message: "Please provide all fields." });
    //check user and password
    const user = await userModel.findOne({ email });
    const match = await bcrypt.compare(password, user.password);

    //token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    if (!user || !match)
      return res
        .status(200)
        .send({ success: true, message: "Invalid credentials!" });

    res
      .status(200)
      .send({ success: true, message: "Login successfully", token });
  } catch (error) {
    console.log("Error logging in user" + error);
    res.status(500).send({ success: false, message: error.message });
  }
};

module.exports = { registerController, loginController };

const testUserController = (req, res) => {
  try {
    res.status(200).send({ success: true, message: "Test user data API" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { testUserController };

const getUserInfo = async (req, res) => {
  try {
    res.status(200).send({ success: true, message: "user data" });
  } catch (error) {
    console.log("Error getting user info" + error);
    res.status(500).send({ success: false, message: error.message });
  }
};

module.exports = { getUserInfo };

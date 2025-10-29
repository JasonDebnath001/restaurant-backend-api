const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    //get token from headers
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .send({ success: false, message: "Unauthorized Access!" });
      } else {
        if (!req.body) {
          req.body = {};
        }
        req.body.id = decoded.id;
        next();
      }
    });
  } catch (error) {
    console.log(error);
  }
};

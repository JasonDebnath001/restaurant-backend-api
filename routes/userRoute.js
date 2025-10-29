const express = require("express");
const { getUserInfo } = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/get-user", authMiddleware, getUserInfo);

module.exports = router;

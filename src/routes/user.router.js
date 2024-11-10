const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller.js");
const verifyToken = require("../middleware/middleware");
router.get("/profile", userController.getUserProfile);
router.get("/", userController.getAllUser)
router.post("/orderItems", verifyToken, userController.CreateOrderItem)

module.exports = router;



const express = require("express");
const router = express.Router();
const orderController = require("../controller/order.controller.js");
router.post("/createOrder", orderController.createOrder);



module.exports = router;
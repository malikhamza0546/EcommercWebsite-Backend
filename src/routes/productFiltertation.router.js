
const express = require("express");
const router = express.Router();
const productFilteration = require("../controller/productFilteration.controller.js");

router.get("/ProductFiltertion", productFilteration.getFilterProducts);


module.exports = router;



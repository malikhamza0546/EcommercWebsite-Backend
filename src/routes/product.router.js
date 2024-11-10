
const express = require("express");
const router = express.Router();
const productController = require("../controller/product.controller.js");

router.post("/Addproduct", productController.createProduct);
router.get("/Allproduct", productController.getAllProducts);


module.exports = router;



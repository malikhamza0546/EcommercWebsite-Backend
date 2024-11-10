const express = require("express");
const router = express.Router();
const categoryController = require("../controller/category.controller.js");
router.get("/createCategory", categoryController.createCategory);
router.post("/createCategory", categoryController.createCategory);
router.get("/categories", categoryController.getAllCategory)


module.exports = router;
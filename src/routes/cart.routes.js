const express = require('express');
const router = express.Router();
const cartController = require('../controller/cart.controller.js');

router.post('/add', cartController.addItemsToCart);
router.delete('/delete', cartController.deleteItemFromCart);
module.exports = router;
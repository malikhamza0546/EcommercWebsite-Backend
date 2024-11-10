const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRouters = require("./routes/auth.router.js")
const userRouters = require("./routes/user.router.js")
const CategoryRouters = require("./routes/category.router.js")
const ProductRouters = require("./routes/product.router.js")
const orderRoutes = require("./routes/order.router.js")
const cartRoutes = require("./routes/cart.routes.js")
const productFiltertation = require("./routes/productFiltertation.router")


app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.get("/", (req, res) => {
  return res.status(200).send({ message: "Welcome to ecommerce API" });
});
app.use("/auth", authRouters)
app.use("/api/user", userRouters)
app.use("/api/admin", CategoryRouters)
app.use("/api/admin", ProductRouters)
app.use("/api/order", orderRoutes)
app.use('/api/cart', cartRoutes);
app.use("/api", productFiltertation)


module.exports = app;
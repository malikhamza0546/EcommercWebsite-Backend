const orderService = require("../services/order.service.js")
const order = require("../models/order.model")
// Bearer token 

const createOrder = async (req, res) => {
    try {
        const Response = await orderService.createOrder(req, res);
        return res.status(200).send(Response)
    }
    catch (error) {
        return res.status(500).send({ error: error.message })
    }
};

module.exports = {
    createOrder
}
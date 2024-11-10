const ProductService = require("../services/product.service.js")
const Category = require("../models/Category.model")
// Bearer token 

const createProduct = async (req, res) => {
    try {
        const Response = await ProductService.createProduct(req, res);
        return res.status(200).send(Response)
    }
    catch (error) {
        return res.status(500).send({ error: error.message })
    }
};



const getAllProducts = async (req, res) => {
    try {

        const Response = await ProductService.getllProduct(req, res);
        return res.status(200).send(Response)

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


module.exports = {
    createProduct, getAllProducts
}
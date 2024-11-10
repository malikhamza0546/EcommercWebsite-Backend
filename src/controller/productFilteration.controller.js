const productFilteration = require("../services/productFilteration.service.js")

const getFilterProducts = async (req, res) => {
    try {
        const Response = await productFilteration.getFilteredProducts(req, res);
        return res.status(200).send(Response)

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


module.exports = {
    getFilterProducts
}
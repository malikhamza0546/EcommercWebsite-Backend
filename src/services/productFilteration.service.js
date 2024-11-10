const Product = require("../models/Product.model"); // Assuming your model is in this path

const getFilteredProducts = async (req, res) => {
    try {
        const query = {};

        // Filter by color
        if (req.query.color) {
            query.color = req.query.color;
        }

        // Filter by multiple sizes
        if (req.query.sizes) {
            // Ensure `req.query.sizes` is an array, even if only one size is provided
            const sizesArray = Array.isArray(req.query.sizes) ? req.query.sizes : req.query.sizes.split(',');

            // Use `$elemMatch` to match any of the specified sizes in the `name` field within the `sizes` array
            query.sizes = {
                $elemMatch: {
                    name: { $in: sizesArray }
                }
            };
        }

        // Filter by price range
        if (req.query.price) {
            const [minPrice, maxPrice] = req.query.price.split('-').map(Number);
            query.price = { $gte: minPrice, $lte: maxPrice };
        }

        // Filter by discount percentage if discount is present
        if (req.query.discount) {
            query.discountPresent = { $gte: parseInt(req.query.discount, 10) };
        }

        // Filter by stock status
        if (req.query.stock === 'out_of_stock') {
            query.quantity = { $eq: 0 };
        } else if (req.query.stock === 'in_stock') {
            query.quantity = { $gt: 0 };
        }

        console.log(query, "queryquery");
        // Execute the query
        const products = await Product.find(query);
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while fetching products" });
    }
};

module.exports = {
    getFilteredProducts,
};

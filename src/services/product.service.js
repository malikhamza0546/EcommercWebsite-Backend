const Product = require("../models/Product.model")
const Category = require("../models/Category.model")
const createProduct = async (req, res) => {
    try {
        const {
            title,
            description,
            price,
            discountPrice,
            discountPresent,
            quantity,
            brand,
            color,
            sizes,
            imageUrl,
            numRatings,
            Category1,
            Category2,
            Category3
        } = req.body;


        if (!title || !description || !price || !quantity) {
            return res.status(400).json({ message: 'Required fields are missing' });
        }

        const findCategory = async (name, parentCategory = null, level) => {
            let category = await Category.findOne({ name, parentCategory, level });
            if (!category) {
                return res.status(400).json({ message: 'Category not found' });
            }
            return category;
        };

        const category1 = await findCategory(Category1, null, 1);
        const category2 = await findCategory(Category2, category1._id, 2);
        const category3 = await findCategory(Category3, category2._id, 3);




        const newProduct = new Product({
            title,
            description,
            price,
            discountPrice,
            discountPresent,
            quantity,
            brand,
            color,
            sizes: sizes.map((size) => ({ name: size })), // Map sizes correctly
            imageUrl,
            numRatings,
            category1: category1._id,
            category2: category2._id,
            category3: category3._id,
        });

        await newProduct.save();
        return res.status(201).json({ message: 'Product added successfully', Product: newProduct.toObject() });

    } catch (error) {

        res.status(500).json({ message: 'Server error' });
    }
}

const getllProduct = async (req, res) => {
    try {
        // const productId = req.params.id; // Or however you get the product ID

        const product = await Product.find({})
            .populate('category1')
            .populate('category2')
            .populate('category3');

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        return res.status(200).json(product).toObject();
    }
    catch (error) {
        throw new Error(error.message)
    }
}

module.exports = {
    createProduct, getllProduct
}
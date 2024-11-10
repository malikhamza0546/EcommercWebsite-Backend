const Category = require("../models/Category.model")

const createCatogry = async (req, res) => {
    try {
        const { name, parentCategory, level } = req.body;
        if (!name || level === undefined) {
            return res.status(400).json({ message: 'Name and level are required' });
        }
        let parentCategoryExists = await Category.findOne({ name: parentCategory });
        if (level > 1) {
            if (!parentCategoryExists) {
                return res.status(404).json({ message: 'Parent category not found' });
            }

        }
        const newCategory = new Category({
            name,
            level,
            parentCategory: parentCategoryExists || null,
        });


        await newCategory.save();
        return res.status(201).json({ message: 'Category added successfully', category: newCategory });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

const getllCatogry = async (user) => {
    try {

    }
    catch (error) {
        throw new Error(error.message)
    }
}

module.exports = {
    createCatogry, getllCatogry
}
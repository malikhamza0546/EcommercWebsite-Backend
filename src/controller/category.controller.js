const categoryService = require("../services/category.service.js")
const Category = require("../models/Category.model")
// Bearer token 

const createCategory = async (req, res) => {
    try {
        const Response = await categoryService.createCatogry(req, res);
        return res.status(200).send(Response)
    }
    catch (error) {
        return res.status(500).send({ error: error.message })
    }
};



const getAllCategory = async (req, res) => {
    try {

        const level1Categories = await Category.find({ level: 1 });
        console.log(level1Categories, "level1Categories");

        const MainArray = await Promise.all(
            level1Categories.map(async (IndivCategory) => {
                const level2Category = await Category.find({ level: 2, parentCategory: IndivCategory._id });
                console.log(level2Category, "level2Category");

                const level3Category = await Promise.all(
                    level2Category.map(async (subCategory) => {
                        const level3Category = await Category.find({ level: 3, parentCategory: subCategory._id });
                        return {
                            subcategory: [...level3Category],
                            name: subCategory.name,
                            _id: subCategory._id,
                            level: 2,
                        };
                    })
                );

                return {
                    subcategory: [...level3Category],
                    name: IndivCategory.name,
                    _id: IndivCategory._id,
                    level: 1,
                };
            })
        );

        console.log(MainArray, "MainArray");






        // Return the final nested category structure
        res.status(200).json(MainArray);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


module.exports = {
    createCategory, getAllCategory
}
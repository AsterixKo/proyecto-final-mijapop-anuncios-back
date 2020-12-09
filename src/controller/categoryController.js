const Category = require('../models/CategoryModel');

module.exports = {
    index: async function (req, res) {
        try {
            const categoriesFound = await Category.find().populate('subcategories');
            res.json(categoriesFound);
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    },
    showById: async function (req, res) {
        try {
            const categoryFound = await Category.findById(req.params.id).populate('subcategories');
            res.json(categoryFound);
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    },
    findByName: async function (req, res) {
        try {
            console.log('findByName:', req.params.name);
            const categoryFound = await Category.findOne({
                name: req.params.name
            });
            res.json(categoryFound);
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    },
    create: async function (req, res) {
        console.log('Creando category, body:', req.body);
        const categoryNew = new Category();
        categoryNew.name = req.body.name;
        categoryNew.description = req.body.description;
        categoryNew.subcategories = req.body.subcategories;

        try {
            const categoryAdded = await categoryNew.save();
            console.log('categoryAdded:', categoryAdded);
            res.status(200).json(categoryAdded);
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    },
    delete: async function (req, res) {
        try {
            const category = await Category.deleteOne({
                _id: req.params.id
            });
            res.sendStatus(200)
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    },
    update: async function (req, res) {
        try {
            const updateQuery = {
                "name": req.body.name,
                "description": req.body.description,
                "subcategories": req.body.subcategories
            }
            const categoryFound = await Category.findOneAndUpdate({
                _id: req.params.id
            }, updateQuery);
            if (categoryFound) {
                // console.log('categoryFound:', categoryFound);
                res.status(200).json(categoryFound);
            } else {
                console.log('Category no encontrado para actualizar');
                res.sendStatus(404);
            }
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    }
};
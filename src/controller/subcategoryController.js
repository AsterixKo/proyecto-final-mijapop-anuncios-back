const {
    MongooseDocument
} = require('mongoose');
const Subcategory = require('../models/subcategoryModel');

module.exports = {
    index: async function (req, res) {
        try {
            const subcategoriesFound = await Subcategory.find().populate('category');
            res.json(subcategoriesFound);
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    },
    showById: async function (req, res) {
        try {
            const subcategoryFound = await Subcategory.findById(req.params.id).populate('category');
            res.json(subcategoryFound);
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    },
    findByName: async function (req, res) {
        try {
            console.log('findByName:', req.params.name);
            const subcategoryFound = await Subcategory.findOne({
                name: req.params.name
            }).populate('category');
            res.json(subcategoryFound);
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    },
    create: async function (req, res) {
        console.log('Creando category, body:', req.body);
        const subcategoryNew = new Subcategory();
        subcategoryNew.name = req.body._name;
        subcategoryNew.description = req.body._description;
        subcategoryNew.category = req.body._category;

        try {
            const subcategoryAdded = await subcategoryNew.save();
            console.log('subcategoryAdded:', subcategoryAdded);
            res.status(200).json(subcategoryAdded);
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    },
    delete: async function (req, res) {
        try {
            const subcategory = await Subcategory.deleteOne({
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
                "name": req.body._name,
                "description": req.body._description,
                "category": req.body._category
            }
            const subcategoryFound = await Subcategory.findOneAndUpdate({
                _id: req.params.id
            }, updateQuery);
            if (subcategoryFound) {
                // console.log('subcategoryFound:', subcategoryFound);
                res.status(200).json(subcategoryFound);
            } else {
                console.log('Subcategory no encontrado para actualizar');
                res.sendStatus(404);
            }
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    }
};
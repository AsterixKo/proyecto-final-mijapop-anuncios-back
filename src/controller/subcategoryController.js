const mongoose = require('mongoose');
const Subcategory = require('../models/subcategoryModel');
// const Category = require('../models/categoryModel');

module.exports = {
    index: async function (req, res) {
        try {
            const subcategoriesFound = await Subcategory.find().collation({locale:'es', strength:2}).sort({name:1}).populate('category');
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
    findByCategoryId: async function (req, res) {
        try {
            console.log('findByCategoryId:', req.params.id);
            const subcategoryFound = await Subcategory.find({
                category: req.params.id
            }).populate('category');
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
        subcategoryNew.name = req.body.name;
        subcategoryNew.description = req.body.description;
        subcategoryNew.category = req.body.category;

        try {
            const subcategoryAdded = await subcategoryNew.save();
            console.log('subcategoryAdded:', subcategoryAdded);

            console.log('req.body.category._id', req.body.category._id);
            const Category = mongoose.model('Category');
            
            const categoryFound = await Category.findById(req.body.category._id);
            categoryFound.subcategories.push(subcategoryAdded);
            await categoryFound.save();

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
                "name": req.body.name,
                "description": req.body.description,
                "category": req.body.category
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
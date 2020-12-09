const mongoose = require('mongoose');
const ProductStatus = require('../models/productStatusModel');

module.exports = {
    index: async function (req, res) {
        try {
            const productStatusFound = await ProductStatus.find().collation({locale:'es', strength:2}).sort({name:1}).populate('category');
            res.json(productStatusFound);
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    },
    showById: async function (req, res) {
        try {
            const productStatusFound = await ProductStatus.findById(req.params.id).populate('category');
            res.json(productStatusFound);
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    },
    findByCategoryId: async function (req, res) {
        try {
            console.log('findByCategoryId:', req.params.id);
            const productStatusFound = await ProductStatus.find({
                category: req.params.id
            }).populate('category');
            res.json(productStatusFound);
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    },
    findByName: async function (req, res) {
        try {
            console.log('findByName:', req.params.name);
            const productStatusFound = await ProductStatus.findOne({
                name: req.params.name
            }).populate('category');
            res.json(productStatusFound);
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    },
    create: async function (req, res) {
        console.log('Creando category, body:', req.body);
        const productStatusNew = new ProductStatus();
        productStatusNew.name = req.body.name;
        productStatusNew.category = req.body.category;

        try {
            const productStatusAdded = await productStatusNew.save();
            console.log('subcategoryAdded:', productStatusAdded);

            res.status(200).json(productStatusAdded);
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    },
    delete: async function (req, res) {
        try {
            const productStatus = await ProductStatus.deleteOne({
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
                "category": req.body.category
            }
            const productStatusFound = await ProductStatus.findOneAndUpdate({
                _id: req.params.id
            }, updateQuery);
            if (productStatusFound) {
                // console.log('productStatusFound:', productStatusFound);
                res.status(200).json(productStatusFound);
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
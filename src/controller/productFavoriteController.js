const mongoose = require('mongoose');
const ProductFavorite = require('../models/productFavoriteModel');

module.exports = {
    index: async function (req, res) {
        try {
            const productsFound = await ProductFavorite.find()
                .populate({
                    path: 'product',
                    populate: [{
                        path: 'category'
                    }, {
                        path: 'subcategory'
                    }, {
                        path: 'province'
                    }, {
                        path: 'productStatus'
                    }, {
                        path: 'userOwner'
                    }]
                })
                .populate('userFavorite');
            res.json(productsFound);
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    },
    showById: async function (req, res) {
        try {
            const productFound = await ProductFavorite.findById(req.params.id)
                .populate('product')
                .populate('userFavorite');
            res.json(productFound);
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    },
    findByProductIdAndUserFavoriteId: async function (req, res) {
        try {
            console.log('findByProductIdAndUserFavoriteId: idProduct:', req.params.idProduct);
            console.log('findByProductIdAndUserFavoriteId: idUserFavorite:', req.params.idUserFavorite);
            const productsFound = await ProductFavorite.findOne({
                    product: req.params.idProduct,
                    userFavorite: req.params.idUserFavorite
                })
                .populate('product')
                .populate('userFavorite');
            res.json(productsFound);
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    },
    findByUserFavoriteId: async function (req, res) {
        try {
            console.log('findByUserFavoriteId: idUserFavorite:', req.params.idUserFavorite);
            const productsFound = await ProductFavorite.find({
                    userFavorite: req.params.idUserFavorite
                })
                .populate({
                    path: 'product',
                    populate: [{
                        path: 'category'
                    }, {
                        path: 'subcategory'
                    }, {
                        path: 'province'
                    }, {
                        path: 'productStatus'
                    }, {
                        path: 'userOwner'
                    }]
                })
                .populate('userFavorite');
            res.json(productsFound);
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    },
    create: async function (req, res) {
        console.log('Creando productFavorite, body:', req.body);
        const productFavoriteNew = new ProductFavorite();
        productFavoriteNew.product = req.body.product;
        productFavoriteNew.userFavorite = req.body.userFavorite;

        try {
            const productFavoriteAdded = await productFavoriteNew.save();
            console.log('productFavoriteAdded:', productFavoriteAdded);

            res.status(200).json(productFavoriteAdded);
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    },
    delete: async function (req, res) {
        try {
            const productDeleted = await ProductFavorite.deleteOne({
                _id: req.params.id
            });
            res.status(200).json(productDeleted);
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    }
};
const mongoose = require('mongoose');
const Product = require('../models/productModel');

module.exports = {
    index: async function (req, res) {
        try {
            const productsFound = await Product.find()
                .populate('category')
                .populate('subcategory')
                .populate('userOwner')
                .populate('productStatus')
                .populate('province');
            res.json(productsFound);
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    },
    search: async function (req, res) {
        try {
            console.log('search:', req.params.query);
            const productsFound = await Product.find({
                $text: {
                    $search: req.params.query
                }
            })
            .populate('category')
            .populate('subcategory')
            .populate('userOwner')
            .populate('productStatus')
            .populate('province');;
            res.json(productsFound);
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    },
    showById: async function (req, res) {
        try {
            const productFound = await Product.findById(req.params.id)
                .populate('category')
                .populate('subcategory')
                .populate('userOwner')
                .populate('productStatus')
                .populate('province');
            res.json(productFound);
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    },
    findByCategoryId: async function (req, res) {
        try {
            console.log('findByCategoryId:', req.params.id);
            const productsFound = await Product.find({
                    category: req.params.id
                })
                .populate('category')
                .populate('subcategory')
                .populate('userOwner')
                .populate('productStatus')
                .populate('province');
            res.json(productsFound);
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    },
    findBySubcategoryId: async function (req, res) {
        try {
            console.log('findBySubcategoryId:', req.params.id);
            const productsFound = await Product.find({
                    subcategory: req.params.id
                })
                .populate('category')
                .populate('subcategory')
                .populate('userOwner')
                .populate('productStatus')
                .populate('province');
            res.json(productsFound);
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    },
    findByUserOwnerId: async function (req, res) {
        try {
            console.log('findByUserOwnerId:', req.params.id);
            const productsFound = await Product.find({
                    userOwner: req.params.id
                })
                .populate('category')
                .populate('subcategory')
                .populate('userOwner')
                .populate('productStatus')
                .populate('province');
            res.json(productsFound);
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    },
    findByUserOwnerIdAndIsSold: async function (req, res) {
        try {
            console.log('findByUserOwnerIdAndIsSold:', req.params.id);
            const productsFound = await Product.find({
                    userOwner: req.params.id,
                    isSold: true
                })
                .populate('category')
                .populate('subcategory')
                .populate('userOwner')
                .populate('productStatus')
                .populate('province');
            res.json(productsFound);
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    },
    findByUserOwnerIdAndIsNotSold: async function (req, res) {
        try {
            console.log('findByUserOwnerIdAndIsSold:', req.params.id);
            const productsFound = await Product.find({
                    userOwner: req.params.id,
                    isSold: false
                })
                .populate('category')
                .populate('subcategory')
                .populate('userOwner')
                .populate('productStatus')
                .populate('province');
            res.json(productsFound);
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    },
    findByProvinceId: async function (req, res) {
        try {
            console.log('findByProvinceId:', req.params.id);
            const productsFound = await Product.find({
                    province: req.params.id
                })
                .populate('category')
                .populate('subcategory')
                .populate('userOwner')
                .populate('productStatus')
                .populate('province');
            res.json(productsFound);
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    },
    findByTown: async function (req, res) {
        try {
            console.log('findByTown:', req.params.town);
            const productsFound = await Product.find({
                    town: req.params.town
                })
                .populate('category')
                .populate('subcategory')
                .populate('userOwner')
                .populate('productStatus')
                .populate('province');
            res.json(productsFound);
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    },
    create: async function (req, res) {
        console.log('Creando product, body:', req.body);
        const productNew = new Product();
        productNew.category = req.body.category;
        productNew.subcategory = req.body.subcategory;
        productNew.userOwner = req.body.userOwner;
        productNew.productStatus = req.body.productStatus;
        productNew.province = req.body.province;
        productNew.userNameOwner = req.body.userNameOwner;
        productNew.name = req.body.name;
        productNew.description = req.body.description;
        productNew.price = req.body.price;
        productNew.currency = req.body.currency;
        productNew.town = req.body.town;
        productNew.isSold = req.body.isSold;
        productNew.photo1 = req.body.photo1;
        productNew.photo2 = req.body.photo2;
        productNew.photo3 = req.body.photo3;
        productNew.photo4 = req.body.photo4;
        productNew.photo5 = req.body.photo5;
        productNew.photo6 = req.body.photo6;
        productNew.photo7 = req.body.photo7;
        productNew.photo8 = req.body.photo8;
        productNew.photo9 = req.body.photo9;
        productNew.photo10 = req.body.photo10;

        try {
            const productAdded = await productNew.save();
            console.log('productAdded:', productAdded);

            res.status(200).json(productAdded);
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    },
    delete: async function (req, res) {
        try {
            const subcategory = await Product.deleteOne({
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
                "category": req.body.category,
                "subcategory": req.body.subcategory,
                "userOwner": req.body.userOwner,
                "productStatus": req.body.productStatus,
                "province": req.body.province,
                "userNameOwner": req.body.userNameOwner,
                "name": req.body.name,
                "description": req.body.description,
                "price": req.body.price,
                "currency": req.body.currency,
                "town": req.body.town,
                "isSold": req.body.isSold,
                "photo1": req.body.photo1,
                "photo2": req.body.photo2,
                "photo3": req.body.photo3,
                "photo4": req.body.photo4,
                "photo5": req.body.photo5,
                "photo6": req.body.photo6,
                "photo7": req.body.photo7,
                "photo8": req.body.photo8,
                "photo9": req.body.photo9,
                "photo10": req.body.photo10
            }
            const productFound = await Product.findOneAndUpdate({
                _id: req.params.id
            }, updateQuery);
            if (productFound) {
                // console.log('productFound:', productFound);
                res.status(200).json(productFound);
            } else {
                console.log('Product no encontrado para actualizar');
                res.sendStatus(404);
            }
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    }
};
const mongoose = require('mongoose');
const Conversation = require('../models/conversationModel');

module.exports = {
    showById: async function (req, res) {
        try {
            const conversationFound = await Conversation.findById(req.params.id)
                .populate('userOwner')
                .populate('userBuyer')
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
                });
            res.json(conversationFound);
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    },
    findByUserOwnerIdOrUserBuyerId: async function (req, res) {
        try {
            console.log('findByUserOwnerIdOrUserBuyerId:userOwnerId:', req.params.userOwnerId);
            console.log('findByUserOwnerIdOrUserBuyerId:userBuyerId:', req.params.userBuyerId);
            const conversationFound = await Conversation.find()
                .or([{
                    userOwner: req.params.userOwnerId
                }, {
                    userBuyer: req.params.userBuyerId
                }])
                .populate('userOwner')
                .populate('userBuyer')
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
                });
            res.json(conversationFound);
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    },
    create: async function (req, res) {

        try {
            console.log('Creando conversation, body:', req.body);
            const conversationNew = new Conversation();
            conversationNew.userOwner = req.body.userOwner;
            conversationNew.userBuyer = req.body.userBuyer;
            conversationNew.product = req.body.product;
            conversationNew.srcPhoto = req.body.srcPhoto;
            conversationNew.productName = req.body.productName;
            conversationNew.nameUserBuyer = req.body.nameUserBuyer;

            //buscamos primero si existe, si existe no la creamos
            const conversationFound = await Conversation.findOne()
                .or([{
                    userOwner: conversationNew.userOwner._id
                }, {
                    userBuyer: conversationNew.userBuyer._id
                }])
                .populate('userOwner')
                .populate('userBuyer')
                .populate('product');

            if (conversationFound) {
                console.log('la conversacion ya existia y no se creara:', conversationFound);
                res.status(200).json(conversationFound);
            } else {
                const conversationAdded = await conversationNew.save();
                console.log('conversationAdded:', conversationAdded);

                res.status(200).json(conversationAdded);
            }
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    },
    delete: async function (req, res) {
        try {
            const conversation = await Conversation.deleteOne({
                _id: req.params.id
            });
            res.sendStatus(200)
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    }
};
const mongoose = require('mongoose');
const Message = require('../models/messageModel');

module.exports = {
    showById: async function (req, res) {
        try {
            const messageFound = await Message.findById(req.params.id)
                .populate('conversation')
                .populate('user');
            res.json(messageFound);
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    },
    findByConversationId: async function (req, res) {
        try {
            console.log('findByConversationId:userOwnerId:', req.params.conversationId);
            const messageFound = await Message.find({
                    conversation: req.params.conversationId
                })
                .populate('conversation')
                .populate('user');
            res.json(messageFound);
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    },
    create: async function (req, res) {

        try {
            console.log('Creando message, body:', req.body);
            const messageNew = new Message();
            messageNew.conversation = req.body.conversation;
            messageNew.user = req.body.user;
            messageNew.userName = req.body.userName;
            messageNew.text = req.body.text;
            messageNew.date = req.body.date;
            messageNew.isChecked = req.body.isChecked;
            messageNew.isOwner = req.body.isOwner;

            const messageAdded = await messageNew.save();
            console.log('messageAdded:', messageAdded);

            res.status(200).json(messageAdded);

        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    },
    delete: async function (req, res) {
        try {
            const message = await Message.deleteOne({
                _id: req.params.id
            });
            res.sendStatus(200)
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    }
};
const {
    MongooseDocument
} = require('mongoose');
const User = require('../models/UserModel');

module.exports = {
    index: async function (req, res) {
        try {
            const usersFound = await User.find();
            res.json(usersFound);
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    },
    showById: async function (req, res) {
        try {
            const user = await User.findById(req.params.id);
            res.json(user);
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    },
    findByEmail: async function (req, res) {
        try {
            console.log('findByEmail:', req.params.email);
            const user = await User.findOne({ _email: req.params.email});
            res.json(user);
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    },
    create: async function (req, res) {
        console.log('Creando usuario, body:', req.body);
        const user = new User();
        user._email = req.body._email;
        user._password = req.body._password;
        user._name = req.body._name;
        user._lastName = req.body._lastName;
        user._location = req.body._location;
        user._description = req.body._description;
        user._callSchedule = req.body._callSchedule;
        user._phone = req.body._phone;
        user._gender = req.body._gender;
        user._dateBirth = req.body._dateBirth;
        user._srcImage = req.body._srcImage;
        user._containsImage = req.body._containsImage;

        try {
            const userFound = await User.findOne({_email: req.body._email});

            if(userFound){
                console.log('Usuario encontrado, no se creara uno nuevo');
                res.sendStatus(500);
            }else{
                const userAdded = await user.save();
                console.log('userAdded:', userAdded);
                res.sendStatus(200);
            }
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    },
    delete: async function (req, res) {
        try {
            const user = await User.deleteOne({
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
                "_password": req.body._password,
                "_name": req.body._name,
                "_lastName": req.body._lastName,
                "_location": req.body._location,
                "_description": req.body._description,
                "_callSchedule": req.body._callSchedule,
                "_phone": req.body._phone,
                "_gender": req.body._gender,
                "_dateBirth": req.body._dateBirth,
                "_srcImage": req.body._srcImage,
                "_containsImage": req.body._containsImage
            }
            const userFound = await User.findOneAndUpdate({
                _id: req.params.id
            }, updateQuery);
            if (userFound) {
                console.log('userFound:', userFound);
                res.sendStatus(200);
            } else {
                console.log('Usuario no encontrado para actualizar');
                res.sendStatus(404);
            }
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    }
};
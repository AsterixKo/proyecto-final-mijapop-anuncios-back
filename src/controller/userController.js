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
            const user = await User.findOne({ email: req.params.email});
            res.json(user);
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    },
    create: async function (req, res) {
        console.log('Creando usuario, body:', req.body);
        const user = new User();
        user.email = req.body._email;
        user.password = req.body._password;
        user.name = req.body._name;
        user.lastName = req.body._lastName;
        user.location = req.body._location;
        user.description = req.body._description;
        user.callSchedule = req.body._callSchedule;
        user.phone = req.body._phone;
        user.gender = req.body._gender;
        user.dateBirth = req.body._dateBirth;
        user.srcImage = req.body._srcImage;
        user.containsImage = req.body._containsImage;

        try {
            const userFound = await User.findOne({_email: req.body._email});

            if(userFound){
                console.log('Usuario encontrado, no se creara uno nuevo');
                res.sendStatus(500);
            }else{
                const userAdded = await user.save();
                console.log('userAdded:', userAdded);
                res.status(200).json(userAdded);
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
                "password": req.body._password,
                "name": req.body._name,
                "lastName": req.body._lastName,
                "location": req.body._location,
                "description": req.body._description,
                "callSchedule": req.body._callSchedule,
                "phone": req.body._phone,
                "gender": req.body._gender,
                "dateBirth": req.body._dateBirth,
                "srcImage": req.body._srcImage,
                "containsImage": req.body._containsImage
            }
            const userFound = await User.findOneAndUpdate({
                _id: req.params.id
            }, updateQuery);
            if (userFound) {
                // console.log('userFound:', userFound);
                res.status(200).json(userFound);
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
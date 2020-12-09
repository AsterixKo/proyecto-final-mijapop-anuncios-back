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
        user.email = req.body.email;
        user.password = req.body.password;
        user.name = req.body.name;
        user.lastName = req.body.lastName;
        user.location = req.body.location;
        user.description = req.body.description;
        user.callSchedule = req.body.callSchedule;
        user.phone = req.body.phone;
        user.gender = req.body.gender;
        user.dateBirth = req.body.dateBirth;
        user.srcImage = req.body.srcImage;
        user.containsImage = req.body.containsImage;

        try {
            const userFound = await User.findOne({email: req.body.email});

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
                "password": req.body.password,
                "name": req.body.name,
                "lastName": req.body.lastName,
                "location": req.body.location,
                "description": req.body.description,
                "callSchedule": req.body.callSchedule,
                "phone": req.body.phone,
                "gender": req.body.gender,
                "dateBirth": req.body.dateBirth,
                "srcImage": req.body.srcImage,
                "containsImage": req.body.containsImage
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
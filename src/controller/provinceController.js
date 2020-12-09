const Province = require('../models/ProvinceModel');

module.exports = {
    index: async function (req, res) {
        try {
            const usersFound = await Province.find().collation({locale:'es', strength:2}).sort({name:1});
            res.json(usersFound);
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    },
    showById: async function (req, res) {
        try {
            const province = await Province.findById(req.params.id);
            res.json(province);
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    },
    findByName: async function (req, res) {
        try {
            console.log('findByName:', req.params.name);
            const province = await Province.findOne({ name: req.params.name});
            res.json(province);
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    },
    create: async function (req, res) {
        console.log('Creando province, body:', req.body);
        const province = new Province();
        province.name = req.body.name;

        try {
            const provinceFound = await Province.findOne({name: req.body.name});

            if(provinceFound){
                console.log('Province encontrado, no se creara uno nuevo');
                res.sendStatus(500);
            }else{
                const provinceAdded = await province.save();
                console.log('provinceAdded:', provinceAdded);
                res.status(200).json(provinceAdded);
            }
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    },
    delete: async function (req, res) {
        try {
            const province = await Province.deleteOne({
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
                "name": req.body.name
            }
            const provinceFound = await Province.findOneAndUpdate({
                _id: req.params.id
            }, updateQuery);
            if (provinceFound) {
                // console.log('provinceFound:', provinceFound);
                res.status(200).json(provinceFound);
            } else {
                console.log('Province no encontrado para actualizar');
                res.sendStatus(404);
            }
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    }
};
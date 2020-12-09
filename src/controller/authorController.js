const Author = require('../models/authorModel');

module.exports = {
    index: async function (req, res) {
        try {
            const authorsFound = await Author.find().populate('books');
            res.json(authorsFound);
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    },
    showById: async function (req, res) {
        try {
            const author = await Author.findById(req.params.id);
            res.json(author);
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    },
    create: async function (req, res) {
        const author = new Author();
        author.name = req.body.name;
        author.familyName = req.body.familyName;
        author.books = req.body.books;

        try {
            const authorAdded = await author.save();
            console.log('authorAdded:', authorAdded);
            res.sendStatus(200);
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    },
    delete: async function (req, res) {
        try {
            const author = await Author.deleteOne({
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
                "familyName": req.body.familyName,
                "books": req.body.books
            }
            const authorFound = await Author.findOneAndUpdate({
                _id: req.params.id
            }, updateQuery);
            if (authorFound) {
                console.log('authorFound:', authorFound);
                res.sendStatus(200);
            } else {
                console.log('Author no encontrado para actualizar');
                res.sendStatus(404);
            }
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    }
};
const Book = require('../models/bookModel');

module.exports = {
    index: async function (req, res) {
        try {
            // const booksFound = await Book.find();
            const booksFound = await Book.find().populate('authorId');
            res.json(booksFound);
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    },
    showById: async function (req, res) {
        try {
            const book = await Book.findById(req.params.id);
            res.json(book);
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    },
    create: async function (req, res) {
        const book = new Book();
        book.title = req.body.title;
        book.description = req.body.description;
        book.authorId = req.body.authorId;

        try {
            const bookAdded = await book.save();
            console.log('bookAdded:', bookAdded);
            res.sendStatus(200);
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    },
    delete: async function (req, res) {
        try {
            const book = await Book.deleteOne({
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
                "title": req.body.title,
                "description": req.body.description,
                "authorId": req.body.authorId
            }
            const bookFound = await Book.findOneAndUpdate({
                _id: req.params.id
            }, updateQuery);
            if (bookFound) {
                console.log('bookFound:', bookFound);
                res.sendStatus(200);
            } else {
                console.log('Libro no encontrado para actualizar');
                res.sendStatus(404);
            }
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    }
};
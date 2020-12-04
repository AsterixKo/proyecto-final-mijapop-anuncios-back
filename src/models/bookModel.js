const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BookSchema = new Schema({
    title: String,
    description: String,
    authorId: {type: mongoose.Schema.Types.ObjectId, ref: 'Author'}
});
//hay que ponerlo en singular porque sino le pondra otra s a Student
module.exports = mongoose.model('Book', BookSchema);
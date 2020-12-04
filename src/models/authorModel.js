const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
    name: String,
    familyName: String,
    books: [{type: Schema.Types.ObjectId, ref: 'Book'}]
});
//hay que ponerlo en singular porque sino le pondra otra s a Author
module.exports = mongoose.model('Author', AuthorSchema);
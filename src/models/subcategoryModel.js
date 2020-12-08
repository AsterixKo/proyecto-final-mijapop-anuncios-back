const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SubcategorySchema = new Schema({
    name: String,
    description: String,
    category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'}
});
//hay que ponerlo en singular porque sino le pondra otra s a Student
module.exports = mongoose.model('Subcategory', SubcategorySchema);
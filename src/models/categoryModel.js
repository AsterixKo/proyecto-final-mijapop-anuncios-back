const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: String,
    description: String,
    subcategories: [{type: Schema.Types.ObjectId, ref: 'Subcategory'}]
});
//hay que ponerlo en singular porque sino le pondra otra s a Category
module.exports = mongoose.model('Category', CategorySchema);
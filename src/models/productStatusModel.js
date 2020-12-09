const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductStatusSchema = new Schema({
    name: String,
    category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'}
});
//hay que ponerlo en singular porque sino le pondra otra s a Productstatus
module.exports = mongoose.model('ProductStatus', ProductStatusSchema);
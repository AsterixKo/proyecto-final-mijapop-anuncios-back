const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    subcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subcategory'
    },
    userOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    productStatus: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductStatus'
    },
    province: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Province'
    },
    userNameOwner: String,
    name: String,
    description: String,
    price: Number,
    currency: String,
    town: String,
    isSold: Boolean,
    photo1: String,
    photo2: String,
    photo3: String,
    photo4: String,
    photo5: String,
    photo6: String,
    photo7: String,
    photo8: String,
    photo9: String,
    photo10: String
});
ProductSchema.index({name: 'text', description: 'text'});
//hay que ponerlo en singular porque sino le pondra otra s a Product
module.exports = mongoose.model('Product', ProductSchema);
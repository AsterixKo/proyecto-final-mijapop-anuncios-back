const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductFavoriteSchema = new Schema({
    userFavorite: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }

});

//hay que ponerlo en singular porque sino le pondra otra s a ProductFavorite
module.exports = mongoose.model('ProductFavorite', ProductFavoriteSchema);
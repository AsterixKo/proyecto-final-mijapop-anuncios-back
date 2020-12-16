const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ConversationSchema = new Schema({
    userOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    userBuyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    srcPhoto: String,
    productName: String,
    nameUserBuyer: String,
    date: Date
});
//hay que ponerlo en singular porque sino le pondra otra s a Conversation
module.exports = mongoose.model('Conversation', ConversationSchema);
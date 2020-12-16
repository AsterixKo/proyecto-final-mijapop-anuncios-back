const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    conversation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Conversation'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    userName: String,
    text: String,
    date: Date,
    isChecked: Boolean,
    isOwner: Boolean
});
//hay que ponerlo en singular porque sino le pondra otra s a Message
module.exports = mongoose.model('Message', MessageSchema);
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: String,
    password: String,
    name: String,
    lastName: String,
    location: String,
    description: String,
    callSchedule: String,
    phone: String,
    gender: String,
    dateBirth: Date,
    srcImage: String,
    containsImage: Boolean
});
//hay que ponerlo en singular porque sino le pondra otra s a User
module.exports = mongoose.model('User', UserSchema);
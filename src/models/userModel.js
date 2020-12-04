const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    _email: String,
    _password: String,
    _name: String,
    _lastName: String,
    _location: String,
    _description: String,
    _callSchedule: String,
    _phone: String,
    _gender: String,
    _dateBirth: Date,
    _srcImage: String,
    _containsImage: Boolean
});
//hay que ponerlo en singular porque sino le pondra otra s a User
module.exports = mongoose.model('User', UserSchema);
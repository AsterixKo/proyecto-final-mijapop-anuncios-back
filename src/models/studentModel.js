const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    nombre: String,
    edad: Number,
    curso: String,
    altura: Number
});
//hay que ponerlo en singular porque sino le pondra otra s a Student
module.exports = mongoose.model('Student', StudentSchema);
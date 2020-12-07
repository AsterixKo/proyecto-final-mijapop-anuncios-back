const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProvinceSchema = new Schema({
    name: String
});
//hay que ponerlo en singular porque sino le pondra otra s a Province
module.exports = mongoose.model('Province', ProvinceSchema);
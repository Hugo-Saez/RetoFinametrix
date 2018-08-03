const Mongoose = require('mongoose');

let valorSchema = Mongoose.Schema ({
    isin: String,
    nombre: String,
    divisa: String,
    familia: String
});

let valorVA = Mongoose.model('valorVA',valorSchema);
module.exports = valorVA;
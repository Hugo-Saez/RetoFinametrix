const Mongoose = require('mongoose');

let valorSchema = Mongoose.Schema ({
    isin: String,
    fecha: Number,
    precio: Number
});

let valorVL = Mongoose.model('valorVL',valorSchema);
module.exports = valorVL;
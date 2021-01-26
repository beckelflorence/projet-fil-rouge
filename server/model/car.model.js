const mongoose = require('mongoose');

var carSchema = mongoose.Schema({
    title: String,
    affiche: String,
    onAir: String,
    synopsis: String,
    date: String
});

var Car = mongoose.model('Car', carSchema);
module.exports = Car;
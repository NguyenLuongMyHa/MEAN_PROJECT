const mongoose = require('mongoose');
const roomSchema = mongoose.Schema({
    title: String,
    description: String,
    address:  String,
    price:  { type: Number, default: 0},
    discount:  { type: Number, default: 0},
    typeid:  { type: Number, default: 1},
    imagePath: { type: String, required: true },
    date_add: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Room', roomSchema);
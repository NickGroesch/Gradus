const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Exercise = new Schema({
    name: {
        type: String,
        required: true
    },
    creator: String,
    cantus: { type: Array, required: true },
    // for cp array [(upper/lower),species]
    counterpoints: { type: array, required: true }
});

const Exercise = mongoose.model('exercises', UserSchema);

module.exports = Exercise;
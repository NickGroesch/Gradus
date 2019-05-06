const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CantusFirmus = new Schema({
    name: {
        type: String,
        required: true
    },
    composer: String,
    midiArray: { type: Array, required: true },
    key: { type: String, required: true }
});
// will the model be 'cantusfirmuss'?
const CantusFirmus = mongoose.model('cantusfirmus', UserSchema);

module.exports = CantusFirmus;
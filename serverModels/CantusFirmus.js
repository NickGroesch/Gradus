const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CantusFirmusSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    composer: String,
    midiArray: { type: Array, required: true },
    key: { type: String, required: true }
});
// will the model be 'cantusfirmuss'?
const CantusFirmus = mongoose.model('cantusfirmus', CantusFirmusSchema);

module.exports = CantusFirmus;
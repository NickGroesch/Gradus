const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CantusFirmus = new Schema({
    name: {
        type: String,
        required: true
    },
    composer: String,
    midiString: String,

});

const User = mongoose.model('users', UserSchema);

module.exports = User;
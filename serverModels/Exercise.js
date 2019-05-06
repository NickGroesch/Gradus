const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    creator: String,
    cantus: {
        type: Schema.Types.ObjectId,
        ref: "cantusfirmus"
    },
    // for cp array [(upper/lower),species]
    counterpoints: {
        type:
            Array, required: true
    }
});

const Exercise = mongoose.model('exercises', ExerciseSchema);

module.exports = Exercise;
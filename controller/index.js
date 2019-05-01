// const db = require("../models");
const translators = require("../utils/translators");

// Defining methods for the booksController
module.exports = {
  returnGraph: function(req, res) {
    // console.log(req.body);
    let play = req.body.play;
    let test = req.body.test;
    console.log("It works");
    let midiPlay = translators.pitchArrayToMidi(play);
    let midiTest = translators.pitchArrayToMidi(test);
    midiPlay = translators.transposeMidiArray(midiPlay, -7);
    play = translators.evalPitchArray(midiPlay, "F");
    test = translators.evalPitchArray(midiTest, "F");
    let dualPlay = translators.formatDual(midiPlay, play);
    let dualTest = translators.formatDual(midiTest, test);
    let playDeltas = translators.deltaDual(dualPlay);
    let testDeltas = translators.deltaDual(dualTest);
    let intervals = translators.intervalCompare(dualPlay, dualTest);
    let data = {
      pD: playDeltas,
      tD: testDeltas,
      compareIntervals: intervals,
      dP: dualPlay,
      dT: dualTest
    };
    // console.log(req);
    res.json(data);
  }
};

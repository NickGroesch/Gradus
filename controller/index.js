// const db = require("../models");
const translators = require("../utils/translators");

// Defining methods for the booksController
module.exports = {
  returnGraph: function (req, res) {
    // console.log(req.body);
    let play = req.body.play;
    let test = req.body.test;
    // console.log("It works");
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
      dT: dualTest,
      assessMotion: translators.assessMotion
    };
    // console.log(req);
    res.json(data);
  },
  analyze: (request, res) => {
    let req = request.body.exercise
    console.log("backEnd", req)
    // for each midi line received we convert it to pitches and duals, then assess the deltas
    let analyticObject = {
      voices: {
        duals: [],
        deltas: []
      }
    }
    req.midi.forEach((voice, index) => {
      // the voice is midi
      // let midiOb = { [`voice${index + 1}midi`]: voice }
      let anOb = analyticObject.voices
      // anOb.midi.push(voice)
      let pitch = translators.evalPitchArray(voice, req.key)
      // anOb.pitch.push(pitch)
      let dual = translators.formatDual(voice, pitch)
      anOb.duals.push(dual)
    })
    console.log("anOb[0]", analyticObject.voices.duals[0])
    console.log("anOb[1]", analyticObject.voices.duals[1])
    let ok = "ok"
    res.json(ok)
  }
};
// console.log(translators.assessMotion)
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
    let analyticObject = {
      voices: {
        duals: [],
        deltas: []
      }
    }
    // for each midi line received we convert it to pitches and duals, then assess the deltas
    req.midi.forEach((voice, index) => {
      let anOb = analyticObject.voices
      let pitch = translators.evalPitchArray(voice, req.key)
      let dual = { [`voice${index + 1}`]: translators.formatDual(voice, pitch) }
      anOb.duals.push(dual)
      let delta = { [`delta${index + 1}`]: translators.deltaDual(dual[`voice${index + 1}`]) }
      anOb.deltas.push(delta)
    })
    /// LOOP LOGIC--We must have lower voices first
    let array = ["w", "x", "y", "z", "0"]
    for (var i = 1; i <= array.length; i++) {
      let first = (array[i - 1])
      // console.log(first)
      for (var j = i + 1; j <= array.length; j++) {
        let second = (array[j - 1])
        console.log(`${first}-${second}`)
      }
    }









    // console.log("anOb[0]", analyticObject.voices.duals[0])
    // console.log("anOb[1]", analyticObject.voices.duals[1])
    // console.log("anOb[0]", analyticObject.voices.deltas[0])
    // console.log("anOb[1]", analyticObject.voices.deltas[1])
    console.log(analyticObject.voices)
    let ok = "ok"
    res.json(ok)
  }
};
// console.log(translators.assessMotion)
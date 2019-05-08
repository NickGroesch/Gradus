// const db = require("../models");
const translators = require("../utils/translators");
const testSuites = require("../utils/testsuites");

// Defining methods for the booksController
module.exports = {
  analyze: (request, res) => {
    let req = request.body.exercise;
    console.log("REQ: ", req);
    let analyticObject = {
      key: req.key,
      voices: {
        duals: [],
        deltas: [],
        abc: []
        // WE NEED ABCJS SUPPORT
      },
      relations: {
        intervals: [],
        motions: []
      }
    };
    let generativeObject = {
      voices: {
        duals: [],
        deltas: []
      }
    };
    let anObV = analyticObject.voices;
    let anObR = analyticObject.relations;
    let genOb = generativeObject.voices;
    // WORKING here we convert each voice to duals, an abc, and assess its deltas
    req.midi.forEach((voice, index) => {
      let pitch = translators.evalPitchArray(voice, req.key);
      let dual = {
        [`voice${index + 1}`]: translators.formatDual(voice, pitch)
      };
      anObV.duals.push(dual);
      genOb.duals.push(dual[`voice${index + 1}`]);
      let delta = {
        [`delta${index + 1}`]: translators.deltaDual(dual[`voice${index + 1}`])
      };
      anObV.deltas.push(delta);
      genOb.deltas.push(delta[`delta${index + 1}`]);
      let abcVoice = {
        [`abc${index + 1}`]: translators.abcify(
          dual[`voice${index + 1}`],
          req.key
        )
      };
      anObV.abc.push(abcVoice);
    });
    // here we assess the intervals between each voice pair
    let arrayDuals = generativeObject.voices.duals;
    for (var i = 1; i <= arrayDuals.length; i++) {
      let first = arrayDuals[i - 1];
      for (var j = i + 1; j <= arrayDuals.length; j++) {
        let second = arrayDuals[j - 1];
        let intervals = {
          [`intervals${i}-${j}`]: translators.intervalCompare(first, second)
        };
        anObR.intervals.push(intervals);
      }
    }
    // here we assess the relative motions of each voice pair('s deltas)
    let arrayDeltas = generativeObject.voices.deltas;
    for (var i = 1; i <= arrayDeltas.length; i++) {
      let first = arrayDeltas[i - 1];
      for (var j = i + 1; j <= arrayDeltas.length; j++) {
        let second = arrayDeltas[j - 1];
        let motions = {
          [`motions${i}-${j}`]: translators.assessMotion(first, second)
        };
        anObR.motions.push(motions);
      }
    }
    res.json(analyticObject);
  },
  cantusSuite: (request, res) => {
    results = testSuites.cantusFirmusSuite(request.body.cantus);
    res.json(results);
  },
  counterpointSuite: (request, res) => {
    console.log("where is it?", request.body);
    results = testSuites.counterpointSuite(request.body.anOb);
    res.json(results);
  }
};

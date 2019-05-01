// import React, { Component } from "react";

import WebMidi, { INoteParam, IMidiChannel } from "webmidi/webmidi.min";
// import { INoteParam, IMidiChannel } from 'webmidi';

//Requires running "npm install @types/webmidi"
//mport WebMidi from "webmidi";

//import * as WebMidi from "../../../node_modules/webmidi/";

export default {
  // MidiEnabled: function() {
  //   WebMidi.enable(function(err) {
  //     if (err) {
  //       console.log("WebMidi could not be enabled.", err);
  //     } else {
  //       console.log("WebMidi enabled!");
  //       console.log("inputs: ", WebMidi.inputs);
  //       console.log("outputs: ", WebMidi.outputs);
  //       return WebMidi.inputs[0];
  //     }
  //   });
  // },
  // PlayNote: function() {
  //   WebMidi.enable(function(err) {
  //     if (err) throw err;
  //     var input = WebMidi.inputs[0];
  //     input.addListener("pitchbend", "all", function(e) {
  //       console.log("Pitch value: " + e.value);
  //     });
  //   });
  // }
};

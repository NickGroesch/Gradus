// import React, { Component } from "react";
//import WebMidi from "webmidi/webmidi.min";

//Requires running "npm install @types/webmidi"
import WebMidi from "../../../node_modules/webmidi";

//import WebMidi from "../../node_modules/webmidi/webmidi.min.js";

export default {
  checkWebMidi: function() {
    return WebMidi.enable(function(err) {
      if (err) {
        console.log("WebMidi could not be enabled.", err);
      } else {
        console.log("WebMidi enabled!");
      }
    });
  }
};

//import API from "../utils/API/WebMidiAPI";
import React, { Component } from "react";
import Abcjs from "react-abcjs";
//import webmidi from "webmidi";

class Midi extends Component {
  state = {
    isConnected: false,
    MidiArray: [],
    step: 0
  };

  componentDidMount = () => {
    this.checkConnect();
  };

  checkConnect = () => {
    //This is not DRY code... It requests MIDI access here then again in the runWebMidi function
    navigator.requestMIDIAccess().then(midiAccess => {
      console.log("MIDIACCESS: ", midiAccess.inputs);
      if (midiAccess.inputs.size > 0) {
        this.setState({ isConnected: true });
      } else {
        console.log("No Midi Connected");
      }
    });
  };

  onMIDISuccess = midiAccess => {
    // var inputs = midiAccess.inputs;
    // var outputs = midiAccess.outputs;
    for (var input of midiAccess.inputs.values()) {
      input.onmidimessage = this.getMIDIMessage;
    }
  };

  onMIDIFailure = () => {
    console.log("Error: Could not access MIDI devices.");
  };

  getMIDIMessage = message => {
    console.log(message.data);

    //command receives instructions from the MIDI instrument to differentiate between keydown and keyup
    var command = message.data[0];
    //note receives MIDI values for note played
    var note = message.data[1];
    //velocity is a value reflecting the strength of the keypress, ranges from 1-127 I think
    var velocity = message.data.length > 2 ? message.data[2] : 0; // a velocity value might not be included with a noteOff command

    //mapping may change based on different MIDI controllers (standard is 144/28?)
    if (command === 145 || command === 144 || command === 160) {
      console.log("Keydown!");
    } else if (command === 129 || command === 128) {
      console.log("Keyup!");
    } else {
      console.log(
        "Command should only equal 145 for keydown and 129 for keyup"
      );
    }

    switch (command) {
      case 144: // note on
        if (velocity > 0) {
          this.noteOn(note, velocity);
        } else {
          this.noteOff(note, velocity);
        }
        break;
      case 145: // note on
        if (velocity > 0) {
          this.noteOn(note, velocity);
        } else {
          this.noteOff(note, velocity);
        }
        break;
      case 128: // note off
        this.noteOff(note, velocity);
        break;
      case 129: // note off
        this.noteOff(note, velocity);
        break;
      default:
        console.log("no data received I think");
      // we could easily expand this switch statement to cover other types of commands such as controllers or sysex
    }
  };

  noteOn = (note, velocity) => {
    console.log("noteOn function ready to go");
    console.log("Noteon Note:", note);
    console.log("Noteon Velocity: ", velocity);
    this.state.MidiArray.push(note);
    console.log(this.state.MidiArray);
  };

  noteOff = (note, velocity) => {
    console.log("noteOff working");
    console.log("Noteoff Note:", note);
  };

  runWebMidi = () => {
    if (this.state.isConnected === true) {
      navigator
        .requestMIDIAccess()
        .then(this.onMIDISuccess, this.onMIDIFailure);
    }
  };

  render() {
    return (
      this.runWebMidi(),
      (
        <div id="container">
          <div>Midi connected? {this.state.isConnected.toString()}</div>
          <div>Notes: {this.state.MidiArray}</div>
          <Abcjs
            abcNotation={
              //X: 1 stave T: title of rendered staff C: composer K: key(G in this case) "|": bar line
              "X:1\nT:Example\nM:4/4\nC:Trad.\nK:G|:gc'c,c dedB|dedB dedB|c2ec B2dB|c2A2 A2BA|"
            }
            parserParams={{}}
            engraverParams={{ responsive: "resize" }}
            renderParams={{ viewportHorizontal: true }}
          />
        </div>
      )
    );
  }
}
export default Midi;

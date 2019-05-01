//import API from "../utils/API/WebMidiAPI";
import React, { Component } from "react";
//import webmidi from "webmidi";

class Midi extends Component {
  state = {
    isConnected: false,
    MidiArray: []
  };

  componentDidMount = () => {
    this.checkConnect();
  };

  checkConnect = () => {
    //This is not DRY code... It requests MIDI access here then again in the runWebMidi function
    navigator.requestMIDIAccess().then(midiAccess => {
      console.log("MIDIACCESS: ", midiAccess.inputs.size);
      if (midiAccess.inputs.size > 0) {
        this.setState({ isConnected: true });
      }
    });
  };

  runWebMidi = () => {
    // Variable which tell us what step of the game we're on.
    // We'll use this later when we parse noteOn/Off messages
    var currentStep = 0;

    // Request MIDI access
    if (navigator.requestMIDIAccess) {
      console.log("This browser supports WebMIDI!");

      navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
    } else {
      console.log("WebMIDI is not supported in this browser.");
    }

    function onMIDISuccess(midiAccess) {
      var inputs = midiAccess.inputs;
      var oututs = midiAccess.outputs;
      for (var input of midiAccess.inputs.values()) {
        input.onmidimessage = getMIDIMessage;
      }
    }

    function onMIDIFailure() {
      console.log("Error: Could not access MIDI devices.");
    }

    function getMIDIMessage(message) {
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
            noteOn(note, velocity);
          } else {
            noteOff(note, velocity);
          }
          break;
        case 145: // note on
          if (velocity > 0) {
            noteOn(note, velocity);
          } else {
            noteOff(note, velocity);
          }
          break;
        case 128: // note off
          noteOff(note, velocity);
          break;
        case 129: // note off
          noteOff(note, velocity);
          break;
        default:
          console.log("no data received I think");
        // we could easily expand this switch statement to cover other types of commands such as controllers or sysex
      }
    }

    // to handle noteOn messages (ie. key is pressed)
    //Think of this like an 'onkeydown' event
    function noteOn(note, velocity) {
      switch (currentStep) {
        case 0:
          console.log("noteOn function ready to go");
          console.log("Noteon Note:", note);
          console.log("Noteon Velocity: ", velocity);
          break;
        default:
          console.log("noteOn defaulted");
      }
    }

    // Function to handle noteOff messages (ie. key is released)
    // Think of this like an 'onkeyup' event
    function noteOff(note, velocity) {
      switch (currentStep) {
        default:
          console.log("noteOff working");
          console.log("Noteoff Note:", note);
          console.log("Noteoff Velocity: ", velocity);
          break;
      }
    }

    // // This function will trigger certain animations and advance gameplay
    // // when certain criterion are identified by the noteOn/noteOff listeners
    // // For instance, a lock is unlocked, the timer expires, etc.
    // function runSequence(sequence) {
    //   switch (sequence) {
    //     case "gamestart":
    //       console.log("started!");
    //       break;
    //     case "lock1":
    //       console.log("lock1");
    //       break;
    //     case "lock2":
    //       console.log("lock2");
    //       break;
    //     default:
    //       console.log("runSequence broke");
    //       break;
    //   }
    // }
  };

  handleInputChange = event => {
    const { placeholder, value } = event.target;
    this.setState({ [placeholder]: value });
  };

  render() {
    this.runWebMidi();

    return <div>Midi connected? {this.state.isConnected.toString()}</div>;
  }
}
export default Midi;

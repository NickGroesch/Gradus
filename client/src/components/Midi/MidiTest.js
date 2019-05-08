//import API from "../utils/API/WebMidiAPI";
import React, { Component } from "react";
import Abcjs from "react-abcjs";
//import webmidi from "webmidi";

class Midi extends Component {
  constructor() {
    super();
    this.state = {
      isConnected: false,
      MidiArray: [],
      noteArray: [],
      exampleMIDI: ["a", "b", "b", "d"],

      //for rendering Abcjs staff
      title: "",
      composer: "",
      key: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount = () => {
    this.checkConnect();
    var testArray = [];
    this.runWebMidi();
  };

  checkConnect = () => {
    navigator.requestMIDIAccess().then(midiAccess => {
      // console.log("MIDIACCESS: ", midiAccess.inputs);
      if (midiAccess.inputs.size > 0) {
        this.setState({ isConnected: true });
        return true;
      } else {
        // console.log("No Midi Connected");
      }
    });
  };

  onMIDISuccess = midiAccess => {
    // var inputs = midiAccess.inputs;
    // var outputs = midiAccess.outputs;
    for (var input of midiAccess.inputs.values()) {
      input.onmidimessage = this.getMIDIMessage;
    }
    // console.log(midiAccess.inputs);
  };

  onMIDIFailure = () => {
    // console.log("Error: Could not access MIDI devices.");
  };

  getMIDIMessage = message => {
    // console.log(message.data);

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
          // this.mapMidiValues();
        } else {
          this.noteOff(note, velocity);
        }
        break;
      case 145: // note on
        if (velocity > 0) {
          this.noteOn(note, velocity);
          this.mapMidiValues();
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

    let stateMidi = this.state.MidiArray;

    console.log(stateMidi);

    this.setState({ MidiArray: this.state.MidiArray.concat(note) });
    // this.setState({ MidiArray: stateMidi });

    console.log(this.state.MidiArray);
  };

  mapMidiValues = () => {
    console.log(this.state.noteArray);
    this.setState({
      noteArray: this.state.MidiArray.map(this.convertToNote)
    });
    console.log(this.state.noteArray);
  };

  convertToNote = midiValue => {
    switch (midiValue) {
      case midiValue > 55:
        return "C";
      default:
        return "G";
    }
  };

  noteOff = (note, velocity) => {
    console.log("noteOff working");
    console.log("Noteoff Note:", note);
  };

  runWebMidi = () => {
    if (this.checkConnect) {
      navigator
        .requestMIDIAccess()
        .then(this.onMIDISuccess, this.onMIDIFailure);
    }
  };

  clearClick = () => {
    this.setState({
      MidiArray: []
    });
  };

  //BackClick removes last input but doesn't show it on screen until another input clicked
  backClick = () => {
    this.state.MidiArray.pop();
    this.setState({
      MidiArray: this.state.MidiArray
    });
    console.log(this.state.MidiArray);
  };

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit(e) {
    e.preventDefault();
    const staff = {
      title: this.state.title,
      composer: this.state.composer,
      key: this.state.key
    };
    console.log(`Creating staff... \n
    creating title: ${staff.title}... \n
    creating composer: ${staff.composer}... \n
    creating key: ${staff.key}... \n
    staff complete!`);
  }

  render() {
    return (
      <div className="container">
        <div>
          <button onClick={this.clearClick}>Clear</button>
          <button onClick={this.backClick}>Back</button>
        </div>

        {/* Check MIDI connection and log notes */}
        <div>Midi connected? {this.state.isConnected.toString()}</div>
        <div>Notes: {this.state.MidiArray}</div>

        {/* Set Title, Composer, and Key of exercise */}
        <div className="container userStaffInput">
          <h2>Start Exercise</h2>
          <form onSubmit={this.handleSubmit}>
            <label>Title</label>
            <input
              type="text"
              name="title"
              placeholder="Masterpiece in G"
              onChange={this.handleInputChange}
              value={this.state.title}
            // ref={userInput => (this.state.exercise.title = userInput)}
            />
            <label>Composer</label>
            <input
              type="text"
              name="composer"
              placeholder="Trad."
              onChange={this.handleInputChange}
            // ref={userInput => (this.state.composer = userInput)}
            />
            <label>Key</label>
            <input
              type="text"
              name="key"
              placeholder="G"
              onChange={this.handleInputChange}
            // ref={userInput => (this.state.key = userInput)}
            />
            <input type="submit" />
          </form>
        </div>

        {/* Render Abcjs music staff */}
        <Abcjs
          abcNotation={
            //X: 1 stave L: note length T: title of rendered staff M: time C: composer K: key(G in this case) "|": bar line
            `X:1\nL:1/1\nT:${this.state.title || "Title"}\nM:4/4\nC:${this.state
              .composer || "Trad"}.\nK:${this.state.key || "G"}\n|:${this.state
                .noteArray[0] || "A"}`
            //Is it really as easy as going through each element of the array?
            //c'c,c dedB|dedB dedB|c2ec B2dB|c2A2 A2BA|`
          }
          parserParams={{}}
          engraverParams={{ responsive: "resize" }}
          renderParams={{ viewportHorizontal: true }}
        />
      </div>
    );
  }
}
export default Midi;

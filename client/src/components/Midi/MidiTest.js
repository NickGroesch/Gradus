//import API from "../utils/API/WebMidiAPI";
import React, { Component } from "react";
//component
import TestAbcjs from "./AbcComponent";

import APIroute1 from "../../utils/API/APIroute1";

class Midi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isConnected: false,
      //MidiValArray and exampleMIDI have to be the same length... so we need placeholders (rests) for the user input for the entire length of the cantus firmus
      // MidiValArray: [60, 59, 60, 60, 60, 60, 60],
      MidiValArray: this.props.pianoArray,
      noteArray: [],

      //To test the analyze API calls
      //exampleMIDI will be replaced by cantus firmus(s)
      exampleMIDI: [60, 59, 60, 60, 60, 60, 60],
      exampleKey: "C",

      //for rendering Abcjs staff
      //Always have a placeholder not empty string for these
      title: "",
      composer: "",
      key: "",

      //state abcjs is created in the setabc function
      abcjs: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //re-render <Abcjs /> when state changes... because we're just passing state as a prop to it
  //   componentWillReceiveProps(nextProps){
  //   if (nextProps.abcjs !== this.abcjs){
  //     this.setState({abcjs: nextProps.abcjs})
  //   }
  // }

  componentDidMount = () => {
    this.checkConnect();
    // this.getGraphs();
    this.runWebMidi();
    this.analyzeMIDI();
  };

  //================Testing analyze functions============================
  analyzeMIDI = () => {
    APIroute1.analyze({
      exercise: {
        midi: [this.state.exampleMIDI, this.state.MidiValArray],
        key: this.state.exampleKey
      }
    }).then(res => {
      let abcStuff = res.data.voices.abc;
      console.log("ABCSTUFF", abcStuff);
      // console.log("LOOK HERE!!: ", this.state.exampleMIDI);
      this.setAbc(abcStuff);
      console.log("state ", this.state);
    });
  };

  setAbc(musicValues) {
    let abcHeader = `X:1\nT:Exercise\nM:4/4\nK:${
      this.state.exampleKey
    }\nL:1/1\n`;
    let abcBody = "";
    let abcData = musicValues;
    // console.log("line 42", this.state.cantus);
    console.log("line 43", abcData);
    // for each voice present in the abcData we will alter the header to create a staff for it
    for (let i = abcData.length - 1; i >= 0; i--) {
      abcHeader.concat(`V:${i + 1} clef=treble name= "Voice${i + 1}"\n`);
      // having created the staff we will create the contents of the staff and add them to the score body
      let abcVoice = `[V:${i + 1}] `;
      abcData[i][`abc${i + 1}`].forEach((value, index) => {
        let note = `${value}|`;
        // abcVoice = abcVoice.concat("X")
        abcVoice = abcVoice.concat(note);
      });
      abcBody = abcBody.concat(abcVoice);
    }
    let abcScore = abcHeader.concat(abcBody);
    this.setState({ abcjs: abcScore });
    console.log("<<<TestMIDI Analyze Function DONE>>> ", this.state.abcjs);
  }

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
          // this.mapMidiValues();
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

    //Loop for generating Abcjs component when you only have fixed data...
    //i.e. when <Midi /> is not a child component of <Graph />

    // let stateMidi = this.state.MidiValArray;
    // console.log(stateMidi);

    // let replaceArray = this.state.noteArray;
    // let cantusArray = this.state.exampleMIDI;
    // if (replaceArray.length < cantusArray.length) {
    //   replaceArray.push(note);
    // } else {
    //   console.log("You can't input more values than the cantus firmus allows");
    // }
    // this.setState({ noteArray: replaceArray });
    // console.log("REPLACEARRAY: ", replaceArray);
    // for (var i = 0; i < stateMidi.length; i++) {
    //   if (replaceArray[i] !== stateMidi[i] && replaceArray[i] !== undefined) {
    //     stateMidi[i] = replaceArray[i];
    //   }
    // }

    // console.log("STATEMIDI", stateMidi);

    // this.setState({ MidiValArray: this.state.MidiValArray.concat(note) });
    this.setState({ MidiValArray: [...this.state.MidiValArray, note] });
    this.props.x([...this.state.MidiValArray, note]);
    console.log(this.state.MidiValArray);

    this.analyzeMIDI();
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
      noteArray: [],
      // MidiValArray: ["z", "z", "z"]
      MidiValArray: [60, 60, 60]
    });
  };

  //BackClick removes last input but doesn't show it on screen until another input clicked
  backClick = () => {
    this.state.MidiValArray.pop();
    // this.state.noteArray.pop()
    this.setState({
      // noteArray: this.state.noteArray,
      MidiValArray: this.state.MidiValArray
    });
    console.log("Notes after clicking back: ", this.state.MidiValArray);
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
    console.log(`Saving staff... \n
    creating title: ${staff.title}... \n
    creating composer: ${staff.composer}... \n
    creating key: ${staff.key}... \n
    save complete!`);
  }

  //FUTURE INLINE MIDI
  // load = () => {
  //   let test = `X:1\nL:1/1\nT:${this.state.title || "Title"}\nM:4/4\nC:${this
  //     .state.composer || "Trad"}.\nK:${this.state.key || "G"}\n|:${this.state
  //     .noteArray[0] || "A"}`;
  //   console.log("INLINE MIDI TEST!! ", test);
  //   // abcjs.renderMidi("midi", this.state.abcjs, {},{ generateInline: true }, {});
  //   // abcjs.renderAbc("paper", this.state.abcjs);
  //   //  window.abcjs.renderMidi("id-of-div-to-place-midi-controls", abcString, {}, { generateInline: true }, {});
  //   // abcjs.renderMidi("midi", test, {}, { generateInline: true }, {});
  // };

  render() {
    return (
      <div className="container">
        <div>
          <button onClick={this.clearClick}>Clear</button>
          <button onClick={this.backClick}>Back</button>
        </div>

        {/* Check MIDI connection and log notes */}
        <div>Midi connected? {this.state.isConnected.toString()}</div>
        <div>Notes: {this.state.MidiValArray}</div>

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

        {/* FUTURE INLINE MIDI */}
        {/* <div id="midi" />
        <div id="paper" /> */}

        {/* <Abcjs
          // FUTURE INLINE MIDI
          // onload={this.load()}
          abcNotation={this.state.abcjs}
          engraverParams={{ responsive: "resize" }}
          renderParams={{ viewportHorizontal: true }}
        /> */}
        {/* FUTURE WORK DO NOT DELETE */}
        {/* <p>
          -----------------------------------------------------------------------
        </p>
        <div id="midi">
          <TestAbcjs id="midi" midiObject={this.state.abcjs} />
        </div> */}
      </div>
    );
  }
}
export default Midi;

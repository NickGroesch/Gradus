import React, { Component } from "react";
import Graphs from "../../components/graphs";
import Midi from "../../components/Midi/MidiTest";
import Piano from "../../components/virtualPiano/nvirtualPiano";
import "./style.css";

// function renderInput() {
//   navigator.requestMIDIAccess().then(midiAccess => {
//     if (midiAccess.inputs.size > 0) {
//       return true;
//     } else {
//       return false;
//     }
//   });
// }

class Exercise extends Component {
  state = {
    showPiano: false
  };
  componentWillMount() {
    var self = this;
    navigator.requestMIDIAccess().then(midiAccess => {
      if (midiAccess.inputs.size > 0) {
        self.setState({
          showPiano: false
        });
      } else {
        self.setState({
          showPiano: true
        });
      }
    });
  }

  render() {
    console.log(this.state);

    if (this.state.showPiano) {
      return (
        <div>
          <Graphs />
          {/* <Piano /> */}
          {/* <Midi /> */}
        </div>
      );
    } else {
      return (
        <div>
          <Graphs />
          {/* <Midi /> */}
        </div>
      );
    }
  }
}

export default Exercise;

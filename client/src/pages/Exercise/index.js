import React, { Component } from "react";
import Graphs from "../../components/graphs";
import Midi from "../../components/Midi/MidiTest";
import dbAPI from "../../utils/API/APIroute1";
import Piano from "./../../components/virtualPiano/virtualPiano";
import "./style.css";
import APIroute1 from "../../utils/API/APIroute1";
import ExCard from "../../components/Exercise-Card/ExCard";

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
  constructor(props) {
    super(props);
    this.state = {
      showPiano: false,
      cantus: []
    };
  };

  componentDidMount() {
    // console.log("++++++++++++++++++")
    dbAPI.findOne().then(data => {
      let cantus = {};
      cantus.name = data.data.name;
      cantus.midi = [data.data.midiArray];
      cantus.key = data.data.key;
      // console.log("--------------data: ", data.data.name)
      // console.log("--------cantus", cantus.key)
      this.state.cantus.push(cantus)
    })
    console.log("++++++++++cantus ", this.state.cantus)
  }

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
    // console.log(this.state);

    if (this.state.showPiano) {
      return (
        <div>
          <a href="/home">Dashboard</a>
          <h1>EXERCISE</h1>
          {/* <Graphs /> */}
          <ExCard
            name={this.state.cantus.name}
            midi={this.state.cantus.midiArray}
            musicKey={this.state.cantus.key} />
          <Piano />
          {/* <Midi /> */}
        </div>
      );
    } else {
      return (
        <div>
          <a href="/home">Dashboard</a>
          <h1>EXERCISE</h1>
          <Graphs />
          {/* <Midi /> */}
        </div >
      );
    }
  }
}

export default Exercise;

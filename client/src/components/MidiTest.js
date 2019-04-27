import API from "../utils/API/WebMidiAPI";
import React, { Component } from "react";

class Midi extends Component {
  state = {
    placeholder: "hmm"
  };

  //   componentDidMount() {
  //     this.testMidi();
  //   }

  testMidi = () => {
    API.checkWebMidi().then(res => this.setState({ placeholder: "mmmh" }));
  };

  render() {
    return <div>{this.state.placeholder}</div>;
  }
}
export default Midi;

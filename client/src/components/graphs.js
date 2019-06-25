import API from "../utils/API/APIroute1";
import React, { Component } from "react";
import "./graphs.css";
import Abcjs from "react-abcjs";
import Piano from "./virtualPiano/nvirtualPiano";
import Midi from "./Midi/MidiTest";

class Graphs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rerender: false,
      pianoArray: [60],
      exercise: {
        key: this.props.key,
        // "C",
        midi:
          this.props.midi
        // [[60, 67, 69, 67, 60, 62, 62, 60]]
        // [[64, 67, 60], [67, 71, 72], [72, 72, 72]] //, this.state.pianoArray]
        // which is cantus firmus? NEED FORMAT FIELD
      },

      data: {},
      abcjs: ""
    };
    // this.x = this.x.bind(this)
  }
  x = y => {
    this.setState({
      pianoArray: y
      // rerender: true
    });
  };
  setAbc() {
    let abcHeader = `X:1\nT:${this.props.name}\nM:4/4\nK:${
      this.state.exercise.key
      }\nL:1/1\n`;
    let abcBody = "";
    let abcData = this.state.data.voices.abc;
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
    console.log("XXX", abcScore);
    this.setState({ abcjs: abcScore });
    console.log(this.state);
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.pianoArray !== prevState.pianoArray) {
      console.log("wer uinsidnet heif ", this.state.pianoArray);
      this.getGraphs();
      // this.doHi()
    }
  }

  getGraphs = () => {
    // this.setState({ rerender: false })
    console.log(this.props)
    let ex = { key: this.props.key, midi: [[this.props.midi], [this.state.pianoArray]] };
    // let ex = this.state.exercise;
    // ex.midi[1] = this.state.pianoArray;

    API.analyze({ exercise: ex }).then(res => {
      this.setState({ data: res.data });
      this.setState({ flag: true });
      console.log("frontEnd", this.state.data);
      this.setAbc();
      // // cantus tests
      // API.cantusFirmusSuite({ cantus: this.state.data }).then(
      //   res => console.log(res.data)
      // )

      // counterpoint tests
      API.counterpointSuite({ anOb: this.state.data }).then(res =>
        console.log(res.data)
      );
      // console.log("frontEnd", this.state.data.voices.duals)
    });
  };

  componentDidMount() {
    this.getGraphs();
    // console.log(this.state.data)
  }
  doHi = () => {
    // this.setState({ rerender: false })
    // this.getGraphs()
    return (
      <div>
        <Abcjs
          abcNotation={
            //X: 1 stave T: title of rendered staff C: composer K: key(G in this case) "|": bar line
            this.state.abcjs
            // this.state.abc
          }
          parserParams={{}}
          engraverParams={{ responsive: "resize" }}
          renderParams={{ viewportHorizontal: true }}
        />
      </div>
    );
  };
  render() {
    return (
      <div>
        {this.state.flag ? (
          <div>
            success: {this.state.pianoArray.toString()}
            {/* NOTE=if this.state.rerender(flag) render agains ; the change of state changes the flag*/}
            {/* {this.state.rerender ? this.doHi() : <div>nope</div>} */}
            {/* {this.doHi()} */}
            <Abcjs
              abcNotation={
                //X: 1 stave T: title of rendered staff C: composer K: key(G in this case) "|": bar line
                this.state.abcjs
                // this.state.abc
              }
              parserParams={{}}
              engraverParams={{ responsive: "resize" }}
              renderParams={{ viewportHorizontal: true }}
            />
          </div>
        ) : (
            <p>failure</p>
          )}
        <Piano pianoArray={this.state.pianoArray} x={this.x} />
        <Midi pianoArray={this.state.pianoArray} x={this.x} />
      </div>
    );
  }
}
export default Graphs;

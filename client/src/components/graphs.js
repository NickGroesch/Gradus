import API from "../utils/API/APIroute1";
import React, { Component } from "react";
import Abcjs from "react-abcjs";


class Graphs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      play: [
        "C.5",
        "C.5",
        "G.5",
        "G.5",
        "A.5",
        "A.5",
        "G.5",
        "G.5",
        "F.5",
        "F.5",
        "E.5",
        "E.5",
        "D.5",
        "D.5",
        "C.5"
      ],
      test: [
        "A.4",
        "C.5",
        "C.5",
        "E.5",
        "F.5",
        "Bb.5",
        "A.5",
        "G.5",
        "F.5",
        "D.5",
        "C.5",
        "E.5",
        "D.5",
        "E.5",
        "F.5"
      ],
      exercise: {
        key: "C",
        midi:
          // [[60, 67, 69, 67, 60, 62, 62, 60]]
          [[64, 62, 60],
          [67, 71, 72],
          [72, 74, 76],
          [79, 79, 79]],
        // which is cantus firmus? NEED FORMAT FIELD

      },
      cf: [],
      cp: [],
      flag: false,
      data: {},
      abcjs: ""
    };
    // this.x = this.x.bind(this)
  }
  setAbc() {
    let abcHeader = `X:1\nT:Counterpoint\nM:4/4\nK:${this.state.exercise.key}\nL:1/1\n`
    let abcBody = ""
    let abcData = this.state.data.voices.abc
    // for each voice present in the abcData we will alter the header to create a staff for it
    for (let i = abcData.length - 1; i >= 0; i--) {
      abcHeader.concat(`V:${i + 1} clef=treble name= "Voice${i + 1}"\n`)
      // having created the staff we will create the contents of the staff and add them to the score body
      let abcVoice = `[V:${i + 1}] `
      abcData[i][`abc${i + 1}`].forEach((value, index) => {
        let note = `${value}|`
        // abcVoice = abcVoice.concat("X")
        abcVoice = abcVoice.concat(note)
      })
      abcBody = abcBody.concat(abcVoice)
    }
    let abcScore = abcHeader.concat(abcBody)
    this.setState({ abcjs: abcScore })
  }

  getGraphs = () => {
    // API.getGraphs({ play: this.state.play, test: this.state.test }).then(
    //   res => {
    //     this.setState({ data: res.data });
    //     console.log(res.data);
    // }
    // );
    // this.createTable();
    API.analyze({ exercise: this.state.exercise }).then(
      res => {
        this.setState({ data: res.data })
        this.setState({ flag: true })
        console.log("frontEnd", this.state.data)
        this.setAbc()
        // cantus tests
        // API.cantusFirmusSuite({ cantus: this.state.data }).then(
        //   res => console.log(res.data)
        // )
        // counterpoint tests
        API.counterpointSuite({ anOb: this.state.data })
        // console.log("frontEnd", this.state.data.voices.duals)
      }
    )
  };
  // componentWillMount() {
  //   this.getGraphs();
  // }
  componentDidMount() {
    this.getGraphs()
    // console.log(this.state.data)
  }


  createTable() {
    const { dP, dT, compareIntervals, pD, tD, assessMotion } = this.state.data;
    // assessMotion(pD, tD)
    // console.log("definition:", assessMotion)
    // console.log(this.state.data);
    let tableDOM = "<h1>table</h1>";
    let dualRow = dual => {
      let midiRow = "<tr><td>Midi</td>";
      let pitchRow = "<tr><td>Pitch</td>";
      dual.forEach(value => {
        midiRow += `<td>${value.midi}</td>`;
        pitchRow += `<td>${value.pitch}</td>`;
      });
      midiRow += "</tr>";
      pitchRow += "</tr>";
      return { midi: midiRow, pitch: pitchRow };
    };
    let deltaRow = delta => {
      let interval = "<tr><td>interval</td>";
      let direction = "<tr><td>direction</td>";
      let quality = "<tr><td>quality</td>";
      delta.forEach(value => {
        // console.log(value);
        interval += `<td>${value[2]}</td>`;
        direction += `<td>${value[0]}</td>`;
        quality += `<td>${value[1]}</td>`;
      });
      interval += "</tr>";
      direction += "</tr>";
      quality += "</tr>";
      return { interval, direction, quality };
    };

    let intervalRow = array => {
      let intervals = "<tr><td>interval</td>";
      let qualities = "<tr><td>quality</td>";
      array.forEach(value => {
        intervals += `<td>${value[2]}</td>`;
        qualities += `<td>${value[1]}</td>`;
      });
      intervals += "</tr>";
      qualities += "</tr>";
      return { intervals, qualities };
    };

    let dProw = dualRow(dP);
    let dTrow = dualRow(dT);
    let intervals = intervalRow(compareIntervals);
    let testDeltas = deltaRow(tD);
    let playDeltas = deltaRow(pD);
    // let empty = "<tr><td></tr>";

    tableDOM += `<table><tbody>${dProw.midi}${dProw.pitch}${
      playDeltas.direction
      }${playDeltas.quality}${playDeltas.interval}<tr><td>x</td></tr>${
      intervals.qualities
      }${intervals.intervals}<tr><td>x</td></tr>${dTrow.midi}${dTrow.pitch}${
      testDeltas.direction
      }
    ${testDeltas.quality}
    ${testDeltas.interval}</tbody></table>`;
    return tableDOM;
    // for (var key in data) {
    //   console.log(key);
    //   console.log(data[key]);
    // }
  }
  kyTable() {
    let table = []
    this.state.data.voices.duals.forEach((v, i) => {
      console.log(v, i)
    })

  }

  displayData() {
    const { data } = this.state;
    console.log(data.voices.duals[0]);
  }
  render() {
    return (
      <div>
        {this.state.flag ? <div>success
        {/* {this.kyTable()} */}
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
          : <p>failure</p>}
        {/* // [0].voice1[1].pitch} */}
        {/* {this.displayData()} */}
        {/* {Object.keys(data).length > 0 ? (
          <div dangerouslySetInnerHTML={{ __html: this.createTable() }} />
        ) : (
            ""
          )} */}
      </div>
    );
  }
}
export default Graphs;

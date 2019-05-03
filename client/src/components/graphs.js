import API from "../utils/API/APIroute1";
import React, { Component } from "react";

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
        midi: [[64, 62, 60], [67, 71, 72], [72, 74, 76], [79, 79, 79]]
        // which is cantus firmus?
      },
      cf: [],
      cp: [],
      data: {},
      deltaString: []
    };
    // this.x = this.x.bind(this)
  }

  getGraphs = () => {
    // API.getGraphs({ play: this.state.play, test: this.state.test }).then(
    //   res => {
    //     this.setState({ data: res.data });
    //     console.log(res.data);
    //   }
    // );
    // this.createTable();
    API.analyze({ exercise: this.state.exercise }).then(res => {
      this.setState({ data: res.data });
      console.log("frontEnd", res.data);
      let info = res.data.voices.deltas;
      let voicesDelta = [];
      // let voicesDeltaNum = [];
      for (var i = 0; i < info.length; i++) {
        // console.log(info[i]);
        // console.log("voicesDelta.push(info[i].delta" + (i + 1) + ")");
        eval("voicesDelta.push(info[i].delta" + (i + 1) + ")");
      }

      let deltaString = [];
      for (var i = 0; i < voicesDelta.length; i++) {
        for (var j = 0; j < voicesDelta[i].length; j++) {
          // console.log(voicesDelta[i][j]);
          let delta = voicesDelta[i][j];
          delta = delta.slice(2, 3);
          delta = delta.toString();

          deltaString.push(delta);
        }
      }
      console.log(deltaString);
      this.setState({ deltaString: deltaString });
      // console.log(voicesDelta);
      // for (var j = 0; j < voicesDelta.length; j++) {}
    });
  };

  componentWillMount() {
    this.getGraphs();
  }

  // createTable() {
  //   const { dP, dT, compareIntervals, pD, tD, assessMotion } = this.state.data;
  //   // assessMotion(pD, tD)
  //   // console.log("definition:", assessMotion)
  //   // console.log(this.state.data);
  //   let tableDOM = "<h1>table</h1>";
  //   let dualRow = dual => {
  //     let midiRow = "<tr><td>Midi</td>";
  //     let pitchRow = "<tr><td>Pitch</td>";
  //     dual.forEach(value => {
  //       midiRow += `<td>${value.midi}</td>`;
  //       pitchRow += `<td>${value.pitch}</td>`;
  //     });
  //     midiRow += "</tr>";
  //     pitchRow += "</tr>";
  //     return { midi: midiRow, pitch: pitchRow };
  //   };
  //   let deltaRow = delta => {
  //     let interval = "<tr><td>interval</td>";
  //     let direction = "<tr><td>direction</td>";
  //     let quality = "<tr><td>quality</td>";
  //     delta.forEach(value => {
  //       // console.log(value);
  //       interval += `<td>${value[2]}</td>`;
  //       direction += `<td>${value[0]}</td>`;
  //       quality += `<td>${value[1]}</td>`;
  //     });
  //     interval += "</tr>";
  //     direction += "</tr>";
  //     quality += "</tr>";
  //     return { interval, direction, quality };
  //   };

  //   let intervalRow = array => {
  //     let intervals = "<tr><td>interval</td>";
  //     let qualities = "<tr><td>quality</td>";
  //     array.forEach(value => {
  //       intervals += `<td>${value[2]}</td>`;
  //       qualities += `<td>${value[1]}</td>`;
  //     });
  //     intervals += "</tr>";
  //     qualities += "</tr>";
  //     return { intervals, qualities };
  //   };

  //   let dProw = dualRow(dP);
  //   let dTrow = dualRow(dT);
  //   let intervals = intervalRow(compareIntervals);
  //   let testDeltas = deltaRow(tD);
  //   let playDeltas = deltaRow(pD);
  //   // let empty = "<tr><td></tr>";

  //   tableDOM += `<table><tbody>${dProw.midi}${dProw.pitch}${
  //     playDeltas.direction
  //   }${playDeltas.quality}${playDeltas.interval}<tr><td>x</td></tr>${
  //     intervals.qualities
  //   }${intervals.intervals}<tr><td>x</td></tr>${dTrow.midi}${dTrow.pitch}${
  //     testDeltas.direction
  //   }
  //   ${testDeltas.quality}
  //   ${testDeltas.interval}</tbody></table>`;
  //   return tableDOM;
  //   // for (var key in data) {
  //   //   console.log(key);
  //   //   console.log(data[key]);
  //   // }
  // }

  render() {
    const { data } = this.state;
    // console.log(data);
    return (
      <div>
        Current delta:
        <tr>{this.state.deltaString}</tr>
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

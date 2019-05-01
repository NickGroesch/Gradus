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
      cf: [],
      cp: [],
      data: {}
    };
  }

  getGraphs = () => {
    API.getGraphs({ play: this.state.play, test: this.state.test }).then(
      res => {
        this.setState({ data: res.data });
        // console.log(this.state);
        // this.createTable();
      }
    );
  };
  componentWillMount() {
    this.getGraphs();
  }

  createTable() {
    const { dP, dT, compareIntervals, pD, tD } = this.state.data;

    let tableDOM = "<h1>table</h1>";
    console.log(this.state.data);
    // console.log(dP);
    let dualRow = dual => {
      let midiRow = "<tr><td>Midi</td>";
      let pitchRow = "<tr><td>Pitch</td>";
      dual.forEach(value => {
        // console.log(value);
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

  render() {
    const { data } = this.state;
    console.log(data);
    return (
      <div>
        {Object.keys(data).length > 0 ? (
          <div dangerouslySetInnerHTML={{ __html: this.createTable() }} />
        ) : (
          ""
        )}
        {/* {this.createTable()} */}
      </div>
    );
  }
}
export default Graphs;

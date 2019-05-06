import API from "../utils/API/APIroute1";
import React, { Component } from "react";
import "./graphs.css";

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
      deltaC1: [],
      deltaC2: [],
      deltaC3: [],
      midi: [],
      pitch: []
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
      let infoDelta = res.data.voices.deltas;
      let voicesDelta = [];
      // let voicesDeltaNum = [];
      for (var i = 0; i < infoDelta.length; i++) {
        // console.log(info[i]);
        // console.log("voicesDelta.push(info[i].delta" + (i + 1) + ")");

        voicesDelta.push(infoDelta[i][`delta${i + 1}`]);
      }

      let deltaC1 = [];
      let deltaC2 = [];
      let deltaC3 = [];
      for (var i = 0; i < voicesDelta.length; i++) {
        for (var j = 0; j < voicesDelta[i].length; j++) {
          // console.log(voicesDelta[i][j]);
          let delta = voicesDelta[i][j];
          delta = delta.slice(0, 1);
          // console.log("delta1", delta);
          delta = delta.toString();
          deltaC1.push(delta);

          let delta2 = voicesDelta[i][j];
          delta2 = delta2.slice(1, 2);
          // console.log("delta2", delta2);
          delta2 = delta2.toString();
          deltaC2.push(delta2);

          let delta3 = voicesDelta[i][j];
          delta3 = delta3.slice(2, 3);
          // console.log("delta3", delta3);
          delta3 = delta3.toString();
          deltaC3.push(delta3);
        }
      }
      this.setState({ deltaC1: deltaC1 });
      this.setState({ deltaC2: deltaC2 });
      this.setState({ deltaC3: deltaC3 });
      // -----------------------

      // Getting Midi and Pitch
      let infoDuals = res.data.voices.duals;
      let voicesDuals = [];
      for (var k = 0; k < infoDuals.length; k++) {
        // console.log(infoDuals[i]);
        // eval("voicesDuals.push(infoDuals[k].voice" + (k + 1) + ")");
        voicesDuals.push(infoDuals[k][`voice${k + 1}`]);
      }
      // console.log(voicesDuals);
      let midi = [];
      let pitch = [];
      for (var h = 0; h < voicesDuals.length; h++) {
        // console.log(voicesDuals[i]);
        for (var m = 0; m < voicesDuals[h].length; m++) {
          // console.log(voicesDuals[h][m].midi);
          midi.push(voicesDuals[h][m].midi);
          pitch.push(voicesDuals[h][m].pitch);
        }
      }
      this.setState({ midi: midi });
      this.setState({ pitch: pitch });

      console.log("state", this.state);
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
        <table>
          <tr>
            <th>Dir.</th>
            <th>Qual.</th>
            <th>Int.</th>
            <th>Midi</th>
            <th>Pitch</th>
          </tr>
          <td className="map-col">
            {this.state.deltaC1.map(column => (
              <tr>{column}</tr>
            ))}
          </td>
          <td className="map-col">
            {this.state.deltaC2.map(column => (
              <tr>{column}</tr>
            ))}
          </td>
          <td className="map-col">
            {this.state.deltaC3.map(column => (
              <tr>{column}</tr>
            ))}
          </td>
          <td className="map-col">
            {this.state.midi.map(column => (
              <tr>{column}</tr>
            ))}
          </td>
          <td className="map-col">
            {this.state.pitch.map(column => (
              <tr>{column}</tr>
            ))}
          </td>
        </table>
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

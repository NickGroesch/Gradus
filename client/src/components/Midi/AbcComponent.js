import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import abcjsObj from "abcjs";

class TestAbcjs extends PureComponent {
  uniqueNumber = Date.now() + Math.random();

  renderAbcNotation(abcNotation, parserParams, engraverParams, renderParams) {
    //HERE looks like where we can call the inline midi and stuff
    const res = abcjsObj.renderAbc(
      "abcjs-result-" + this.uniqueNumber,
      abcNotation,
      parserParams,
      engraverParams,
      renderParams
    );
  }
  //=================================MY CODE==================================
  //PROBLEMS: where is the .renderMidi function coming from? abcjsObj? I want to recreate basic-midi.html from node_modules
  //but instead of a static MIDI I want to pass the state.abcjs object from MidiTest.js
  //Does there have to be a new div with a specific id rendered on the public index.html?

  //   renderMidi(id, midiObject) {
  //     var abc = midiObject;
  // "T: Cooley's\n" +
  // 		"M: 4/4\n" +
  // 		"L: 1/8\n" +
  // 		"R: reel\n" +
  // 		"K: Emin\n" +
  // 		"|:D2|EB{c}BA B2 EB|~B2 AB dBAG|FDAD BDAD|FDAD dAFD|\n" +
  // 		"EBBA B2 EB|B2 AB defg|afe^c dBAF|DEFD E2:|\n" +
  // 		"|:gf|eB B2 efge|eB B2 gedB|A2 FA DAFA|A2 FA defg|\n" +
  // 		"eB B2 eBgB|eB B2 defg|afe^c dBAF|DEFD E2:|";

  Load = midiObject => {
    //   ABCJS.renderAbc("paper", abc);
    abcjsObj.renderMidi("test", midiObject);
    //   ABCJS.renderMidi(
    //     "midi-download",
    //     abc,
    //     {},
    //     { generateDownload: true, generateInline: false }
    //   );
    //};
  };
  //=================================MY CODE==================================

  componentDidMount() {
    const {
      abcNotation,
      parserParams,
      engraverParams,
      renderParams
    } = this.props;
    this.renderAbcNotation(
      abcNotation,
      parserParams,
      engraverParams,
      renderParams
    );
  }

  componentWillReceiveProps(nextProps) {
    const {
      abcNotation,
      parserParams,
      engraverParams,
      renderParams
    } = nextProps;
    this.renderAbcNotation(
      abcNotation,
      parserParams,
      engraverParams,
      renderParams
    );
  }

  render() {
    return (
      <div style={{ width: "100%" }}>
        <div
          id={"abcjs-result-" + this.uniqueNumber}
          style={{ width: "100%" }}
          onLoad={this.Load()}
        />
      </div>
    );
  }
}

TestAbcjs.propTypes = {
  abcNotation: PropTypes.string,
  parserParams: PropTypes.object,
  engraverParams: PropTypes.object,
  renderParams: PropTypes.object
};

TestAbcjs.defaultProps = {
  abcNotation: "",
  parserParams: {},
  engraverParams: { responsive: "resize" },
  renderParams: { viewportHorizontal: true }
};

export default TestAbcjs;

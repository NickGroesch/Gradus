import React, { Component } from "react";
import "./virtualPiano.css";
// import Abcjs from "react-abcjs";
// import "./virtualPiano.css";

class Piano extends Component {
  state = {
    // displays current keys that user has chosen
    MidiArray: this.props.pianoArray,
    // which octave we are currently working on (multiple of 12)
    octaveCount: 0,
    // starting value of each key in the presented octave
    keyID: [60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71],

    keysClicked: [
      {
        id: "0",
        clicked: false
      },
      {
        id: "1",
        clicked: false
      },
      {
        id: "2",
        clicked: false
      },
      {
        id: "3",
        clicked: false
      },
      {
        id: "4",
        clicked: false
      },
      {
        id: "5",
        clicked: false
      },
      {
        id: "6",
        clicked: false
      },
      {
        id: "7",
        clicked: false
      },
      {
        id: "8",
        clicked: false
      },
      {
        id: "9",
        clicked: false
      },
      {
        id: "10",
        clicked: false
      },
      {
        id: "11",
        clicked: false
      }
    ]
  };

  //   constructor(props) {
  //     super(props);
  //   }

  clearClick = () => {
    // console.log("clear click");
    this.setState({
      MidiArray: []
    });
  };

  backClick = () => {
    // console.log("back click");
    this.state.MidiArray.pop();
    // console.log("change: ", this.state.MidiArray);
    this.setState({
      MidiArray: this.state.MidiArray
    });
  };

  octaveIncrement = () => {
    // double check what the current octave count is, in order to see if it changed later
    // console.log(`Octave count pre-update: ${this.state.octaveCount}`);

    // create a callback function to reset the octave state and then reset the state id #s
    this.setState(
      (prevState, props) => ({
        octaveCount: prevState.octaveCount + 12
      }),
      () => {
        // map keyID to newID to reset id #s to match new octave
        let newID = this.state.keyID.map(x => x + 12);

        // match keyID in state to newID created from mapping
        this.setState({ keyID: newID });
      }
    );
  };

  octaveDecrement = () => {
    this.setState(prevState => ({
      octaveCount: prevState.octaveCount - 12
    }));

    let newID = this.state.keyID.map(x => x - 12);

    this.setState({ keyID: newID });
  };

  pianoKeyClick = e => {
    let keysClicked = [...this.state.keysClicked];
    keysClicked.forEach(key => (key.clicked = false));
    keysClicked.forEach(key => {
      // console.log("clicked: ", e.target.attributes.name.value);
      if (
        parseInt(keysClicked.id) === parseInt(e.target.attributes.name.value)
      ) {
        // console.log("key id ", key.id);
        key.clicked = true;
      }
    });

    this.setState({ keysClicked: keysClicked });
    // this.state.MidiArray.forEach(key => )

    // console.log('about to set state of midi aray!!!', e.target.id)

    this.setState({
      MidiArray: [...this.state.MidiArray, parseInt(e.target.id)]
    });
    this.props.x([...this.state.MidiArray, parseInt(e.target.id)]);
  };

  // if "last visited", remove flag from any other key, and change flag for "this" key from passive/false to active/true, which adds a css class

  render() {
    return (
      <div className="row piano-container" style={{ marginBottom: "150px" }}>
        <div className="col-6 virtual-piano">
          <div className="svg-container">
            <svg className="piano">
              <polygon
                name="0"
                points="200,10 230,10 230,100 245,100 245,220 200,220 200,10"
                className="white pianoKey"
                id={this.state.keyID[0]}
                onClick={this.pianoKeyClick}
              />
              <polygon
                name="1"
                points="245,100 260,100 260,10 275,10 275,100 290,100 290,220 245,220 245,100"
                className="white pianoKey"
                id={this.state.keyID[2]}
                onClick={this.pianoKeyClick}
              />
              <polygon
                name="2"
                points="305,10 335,10 335,220 290,220 290,100 305,100 305,10"
                className={`white pianoKey ${
                  this.state.keysClicked.key3 ? " playing" : ""
                }`}
                id={this.state.keyID[4]}
                onClick={this.pianoKeyClick}
              />
              <polygon
                name="3"
                points="335,10 365,10 365,100 380,100 380,220 335,220 335,10"
                className="white pianoKey"
                id={this.state.keyID[5]}
                onClick={this.pianoKeyClick}
              />
              <polygon
                name="4"
                points="380,100 395,100 395,10 410,10 410,100 425,100 425,220 380,220 380,100"
                className="white pianoKey"
                id={this.state.keyID[7]}
                onClick={this.pianoKeyClick}
              />
              <polygon
                name="5"
                points="425,100 440,100 440,10 455,10 455,100 470,100 470,220 425,220 425,100"
                className="white pianoKey"
                id={this.state.keyID[9]}
                onClick={this.pianoKeyClick}
              />
              <polygon
                name="6"
                points="470,100 485,100 485,10 515,10 515,220 470,220 470,100"
                className="white pianoKey"
                id={this.state.keyID[11]}
                onClick={this.pianoKeyClick}
              />
              <polygon
                name="7"
                points="230,10 260,10 261,130 231,130 230,10"
                className="black pianoKey"
                id={this.state.keyID[1]}
                onClick={this.pianoKeyClick}
              />
              <polygon
                name="8"
                points="275,10 305,10 306,130 276,130 275,10"
                className="black pianoKey"
                id={this.state.keyID[3]}
                onClick={this.pianoKeyClick}
              />
              <polygon
                name="9"
                points="365,10 395,10 396,130 366,130 365,10"
                className="black pianoKey"
                id={this.state.keyID[6]}
                onClick={this.pianoKeyClick}
              />
              <polygon
                name="10"
                points="410,10 440,10 441,130 411,130 410,10"
                className="black pianoKey"
                id={this.state.keyID[8]}
                onClick={this.pianoKeyClick}
              />
              <polygon
                name="11"
                points="455,10 485,10 486,130 456,130 455,10"
                className="black pianoKey"
                id={this.state.keyID[10]}
                onClick={this.pianoKeyClick}
              />
            </svg>
          </div>
        </div>
        <div className="col-6 note-nav">
          <div>Notes: {this.state.MidiArray.toString()}</div>
          <div>Current Octave Count: {this.state.octaveCount}</div>
          {/* <button
            id="octave-up"
            onClick={
              this.state.octaveCount < 60
                ? this.octaveIncrement
                : (this.state.octaveCount = 60)
            }
          >
            octave +
          </button>
          <button
            id="octave-down"
            onClick={
              this.state.octaveCount > -60
                ? this.octaveDecrement
                : (this.state.octaveCount = -60)
            }
          >
            octave -
          </button>
        </div> */}

          {/* directly changing the state is apparently frowned on by React so changed or condition to setState */}
          <button
            className="piano-button octave"
            id="octave-up"
            onClick={
              this.state.octaveCount < 61
                ? this.octaveIncrement
                : this.setState({ octaveCount: 60 })
            }
          >
            octave +
          </button>
          <button
            className="piano-button octave"
            id="octave-down"
            onClick={
              this.state.octaveCount > -61
                ? this.octaveDecrement
                : this.setState({ octaveCount: -60 })
            }
          >
            octave -
          </button>
          <div>
            <button className="piano-button" onClick={this.clearClick}>
              Clear
            </button>
            <button className="piano-button" onClick={this.backClick}>
              Back
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Piano;

// TO DO
// change css state from active onclick to passive onclick

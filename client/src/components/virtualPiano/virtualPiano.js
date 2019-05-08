import React, { Component } from "react";
import "./virtualPiano.css";
import APIroute1 from "../../utils/API/APIroute1";
import Abcjs from "react-abcjs";

class Piano extends Component {
    state = {
        // displays current keys that user has chosen
        MidiArray: [],
        // which octave we are currently working on (multiple of 12)
        octaveCount: 0,
        // starting value of each key in the presented octave
        keyID: [60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71],


        constructor(props) {
            super(props);
            this.state = {
                // displays current keys that user has chosen
                MidiArray: [],
                // which octave we are currently working on (multiple of 12)
                octaveCount: 0,
                // starting value of each key in the presented octave
                keyID: [60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71],
                // title from form
                title: "",
                // composer from form
                composer: "",
                // key from form
                musicKey: ""
            };

            this.handleInputChange = this.handleInputChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        };

        componentDidMount = () => {
            console.log('mounted!!!!!')
            APIroute1.analyze({ exercise: { midi: this.state.MidiArray, key: this.state.musicKey } })
                .then(res => {
                    let abcStuff = res.data.voices.abc;
                    this.setAbc(abcStuff);
                    // console.log("working: ", abcStuff)
                })
        }

    handleInputChange = e => {
            this.setState({
                [e.target.name]: e.target.value
            });
        };

        handleSubmit = e => {
            e.preventDefault();
            const staff = {
                title: this.state.title,
                composer: this.state.composer,
                key: this.state.key
            };
            console.log(`Saving staff... \n
          creating title: ${staff.title}... \n
          creating composer: ${staff.composer}... \n
          creating key: ${staff.key}... \n
          save complete!`);
        }

    clearClick = () => {
            // console.log("clear click")
            this.setState({
                MidiArray: []
            })
        }

    backClick = () => {
            // console.log("back click")
            this.state.MidiArray.pop()
            // console.log("change: ", this.state.MidiArray)
            this.setState({
                MidiArray: this.state.MidiArray
            })
        }

    octaveIncrement = () => {
            // double check what the current octave count is, in order to see if it changed later
            // console.log(`Octave count pre-update: ${this.state.octaveCount}`);

            // create a callback function to reset the octave state and then reset the state id #s
            this.setState((prevState, props) => ({
                octaveCount: (prevState.octaveCount + 12)
            }), () => {
                // map keyID to newID to reset id #s to match new octave
                let newID = this.state.keyID.map(x => x + 12);

                // match keyID in state to newID created from mapping
                this.setState(({ keyID: newID }));
            });
        };


        octaveDecrement = () => {
            this.setState(prevState => ({
                octaveCount: prevState.octaveCount - 12
            }));

            let newID = this.state.keyID.map(x => x - 12);

            this.setState(({ keyID: newID }));
        }

    pianoKeyClick = (e) => {
            this.setState({
                MidiArray: [...this.state.MidiArray, e.target.id]
            })

        };

        setAbc(musicValues) {
            console.log("setAbc going")
            let abcHeader = `X:1\nT:Cantus Firmus ${this.state.title}\nM:4/4\nK:${this.state.musicKey}C\nL:1/1\n`
            // let abcHeader = `X:1\nT:Cantus Firmus ${this.props.name}\nM:4/4\nK:F\nL:1/1\n`
            console.log("header ", abcHeader)
            let abcBody = "";
            let abcData = musicValues;
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


    render() {
            console.log("rendered", this.state)
            return (
                <div>
                    {/* Set Title, Composer, and Key of exercise */}
                    <div className="container userStaffInput">
                        <h2>Start Exercise</h2>
                        <form onSubmit={this.handleSubmit}>
                            <label>Title</label>
                            <input
                                type="text"
                                name="title"
                                placeholder="Masterpiece in G"
                                onChange={this.handleInputChange}
                                value={this.state.title}
                            // ref={userInput => (this.state.exercise.title = userInput)}
                            />
                            <label>Composer</label>
                            <input
                                type="text"
                                name="composer"
                                placeholder="Trad."
                                onChange={this.handleInputChange}
                            // ref={userInput => (this.state.composer = userInput)}
                            />
                            <label>Key</label>
                            <input
                                type="text"
                                name="key"
                                placeholder="G"
                                onChange={this.handleInputChange}
                            // ref={userInput => (this.state.key = userInput)}
                            />
                            <input type="submit" />
                        </form>

                        <Abcjs
                            abcNotation={
                                //X: 1 stave T: title of rendered staff C: composer K: key(G in this case) "|": bar line
                                this.state.abcjs
                                // this.state.abc
                            }
                            parserParams={{}}
                            engraverParams={{ responsive: "resize" }}
                            renderParams={{ viewportHorizontal: true }} />
                    </div>
                    <div className="virtual-piano">
                        <div className="svg-container">
                            <svg className="piano">
                                <polygon points="200,10 230,10 230,100 245,100 245,220 200,220 200,10"
                                    className="white pianoKey"
                                    id={this.state.keyID[0]}
                                    onClick={this.pianoKeyClick} />
                                <polygon points="245,100 260,100 260,10 275,10 275,100 290,100 290,220 245,220 245,100"
                                    className="white pianoKey"
                                    id={this.state.keyID[2]}
                                    onClick={this.pianoKeyClick} />
                                <polygon points="305,10 335,10 335,220 290,220 290,100 305,100 305,10"
                                    className='white pianoKey'
                                    id={this.state.keyID[4]}
                                    onClick={this.pianoKeyClick} />
                                <polygon points="335,10 365,10 365,100 380,100 380,220 335,220 335,10"
                                    className="white pianoKey"
                                    id={this.state.keyID[5]}
                                    onClick={this.pianoKeyClick} />
                                <polygon points="380,100 395,100 395,10 410,10 410,100 425,100 425,220 380,220 380,100"
                                    className="white pianoKey"
                                    id={this.state.keyID[7]}
                                    onClick={this.pianoKeyClick} />
                                <polygon points="425,100 440,100 440,10 455,10 455,100 470,100 470,220 425,220 425,100"
                                    className="white pianoKey"
                                    id={this.state.keyID[9]}
                                    onClick={this.pianoKeyClick} />
                                <polygon points="470,100 485,100 485,10 515,10 515,220 470,220 470,100"
                                    className="white pianoKey"
                                    id={this.state.keyID[11]}
                                    onClick={this.pianoKeyClick} />
                                <polygon points="230,10 260,10 261,130 231,130 230,10"
                                    className="black pianoKey"
                                    id={this.state.keyID[1]}
                                    onClick={this.pianoKeyClick} />
                                <polygon points="275,10 305,10 306,130 276,130 275,10"
                                    className="black pianoKey"
                                    id={this.state.keyID[3]}
                                    onClick={this.pianoKeyClick} />
                                <polygon points="365,10 395,10 396,130 366,130 365,10"
                                    className="black pianoKey"
                                    id={this.state.keyID[6]}
                                    onClick={this.pianoKeyClick} />
                                <polygon points="410,10 440,10 441,130 411,130 410,10"
                                    className="black pianoKey"
                                    id={this.state.keyID[8]}
                                    onClick={this.pianoKeyClick} />
                                <polygon points="455,10 485,10 486,130 456,130 455,10"
                                    className="black pianoKey"
                                    id={this.state.keyID[10]}
                                    onClick={this.pianoKeyClick} />
                            </svg>
                        </div>

                        <div>Notes: {this.state.MidiArray.toString()}</div>
                        <div>Current Octave Count: {this.state.octaveCount}</div>
                        <button id="octave-up" onClick={this.state.octaveCount < 60 ? this.octaveIncrement : this.state.octaveCount = 60}>octave +</button>
                        <button id="octave-down" onClick={this.state.octaveCount > -60 ? this.octaveDecrement : this.state.octaveCount = -60}>octave -</button>

                    </div>

                    <div>
                        <button onClick={this.clearClick}>Clear</button>
                        <button onClick={this.backClick}>Back</button>
                    </div>
                </div>
            )
        }
    }

    export default Piano;

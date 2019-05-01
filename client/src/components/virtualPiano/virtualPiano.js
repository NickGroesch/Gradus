import React, { Component } from "react";
import "./virtualPiano.css";

// let keyData;
class Piano extends Component {
    state = {
        keysPlayed: [],
        octaveCount: 0,
        keyID: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    }
    constructor(props) {
        super(props);
        // this.octaveIncrement = this.octaveIncrement.bind(this);
        // console.log(this)
    }


    resetID = () => {
        // pass a keyID to map
        let newID = this.state.keyID.map(x => x + this.state.octaveCount);
        //change the state of KeyID
        this.setState(({ keyID: newID }));
        console.log("octave: line 26 ", this.state.octaveCount)
        console.log("new id: line 27 ", newID)
        console.log("key id: line 28 ", this.state.keyID)
    }

    octaveIncrement = () => {
        this.setState(prevState => ({
            octaveCount: prevState.octaveCount + 12
        }));
        // pass a keyID to map
        let newID = this.state.keyID.map(x => x + this.state.octaveCount);
        // let newID =
        //change the state of KeyID
        this.setState(({ keyID: newID }));
        console.log("octave: line 26 ", this.state.octaveCount)
        console.log("new id: line 27 ", newID)
        console.log("key id: line 28 ", this.state.keyID)
        // resetID();
    }


    octaveDecrement = () => {
        this.setState(prevState => ({
            octaveCount: prevState.octaveCount - 12
        }));
        console.log("subtract 12")
        // pass a keyID to map
        let newID = this.state.keyID.map(x => x - this.state.octaveCount);
        //change the state of KeyID
        this.setState(({ keyID: newID }));
    }

    pianoKeyClick = () => {
        console.log("new key ids: ", this.state.keyID)
        // console.log("piano key clicked", this.state.octaveCount);
    }
    // $(".pianoKey").click(function () {
    //     // var keyData = $(this)[0].id;
    //     keyData = $(this)[0].id;
    //     // keysPlayed.push(keyData);
    //     // console.log(keysPlayed)
    //     console.log(keyData);
    //     return keyData;
    //     // var audioClip = $("#c_octave1_audio")[0];
    //     // console.log("the sound: ", audioClip);
    //     // audioClip.play();
    // });

    render() {
        return (
            <div className="virtual-piano">
                <div className="svg-container">
                    <svg className="piano">
                        <polygon points="200,10 230,10 230,100 245,100 245,220 200,220 200,10" className="white pianoKey"
                            id={this.state.keyID[0]} onClick={this.pianoKeyClick} />
                        <polygon points="245,100 260,100 260,10 275,10 275,100 290,100 290,220 245,220 245,100"
                            className="white pianoKey" id={this.state.keyID[2]} onClick={this.pianoKeyClick} />
                        <polygon points="305,10 335,10 335,220 290,220 290,100 305,100 305,10" className="white pianoKey" id={this.state.keyID[4]} onClick={this.pianoKeyClick} />
                        <polygon points="335,10 365,10 365,100 380,100 380,220 335,220 335,10" className="white pianoKey" id={this.state.keyID[5]} onClick={this.pianoKeyClick} />
                        <polygon points="380,100 395,100 395,10 410,10 410,100 425,100 425,220 380,220 380,100"
                            className="white pianoKey" id={this.state.keyID[7]} onClick={this.pianoKeyClick} />
                        <polygon points="425,100 440,100 440,10 455,10 455,100 470,100 470,220 425,220 425,100"
                            className="white pianoKey" id={this.state.keyID[9]} onClick={this.pianoKeyClick} />
                        <polygon points="470,100 485,100 485,10 515,10 515,220 470,220 470,100" className="white pianoKey" id={this.state.keyID[11]} onClick={this.pianoKeyClick} />

                        <polygon points="230,10 260,10 261,130 231,130 230,10" className="black pianoKey" id={this.state.keyID[1]} onClick={this.pianoKeyClick} />
                        <polygon points="275,10 305,10 306,130 276,130 275,10" className="black pianoKey" id={this.state.keyID[3]} onClick={this.pianoKeyClick} />
                        <polygon points="365,10 395,10 396,130 366,130 365,10" className="black pianoKey" id={this.state.keyID[6]} onClick={this.pianoKeyClick} />
                        <polygon points="410,10 440,10 441,130 411,130 410,10" className="black pianoKey" id={this.state.keyID[8]} onClick={this.pianoKeyClick} />
                        <polygon points="455,10 485,10 486,130 456,130 455,10" className="black pianoKey" id={this.state.keyID[10]} onClick={this.pianoKeyClick} />
                    </svg>
                </div>
                <button id="octave-up" onClick={this.octaveIncrement}>octave +</button>
                <button id="octave-down" onClick={this.octaveDecrement}>octave -</button>
            </div>
        )
    }
}

export default Piano;

// TO DO
// get piano to show up in react
// display array chosen to user
// get state to change on click
// change css state from active onclick to passive onclick
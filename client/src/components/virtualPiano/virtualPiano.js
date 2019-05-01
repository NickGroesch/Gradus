import React, { Component } from "react";
import "./virtualPiano.css";

let keyData;
class Piano extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // message: "",
            // keysPlayed: [],
            octaveRange: 0
        }
        this.octaveClick = this.octaveClick.bind(this);
        console.log(this)
    }


    octaveClick() {
        this.setState(state => ({
            octaveRange: state.octaveRange
        }));
    }
    // $("#octave-up").on("click", function() {
    //     console.log("octave UP");
    //     // increase keyData by 12
    // })

    // $("#octave-down").on("click", function () {
    //     console.log("octave DOWN");
    //     // decrease keyData by 12
    // })

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
                        <polygon points="200,10 230,10 230,100 245,100 245,220 200,220 200,10" className="white pianoKey" data-key="500"
                            id="0" />
                        <polygon points="245,100 260,100 260,10 275,10 275,100 290,100 290,220 245,220 245,100"
                            className="white pianoKey" id="2" />
                        <polygon points="305,10 335,10 335,220 290,220 290,100 305,100 305,10" className="white pianoKey" id="4" />
                        <polygon points="335,10 365,10 365,100 380,100 380,220 335,220 335,10" className="white pianoKey" id="5" />
                        <polygon points="380,100 395,100 395,10 410,10 410,100 425,100 425,220 380,220 380,100"
                            className="white pianoKey" id="7" />
                        <polygon points="425,100 440,100 440,10 455,10 455,100 470,100 470,220 425,220 425,100"
                            className="white pianoKey" id="9" />
                        <polygon points="470,100 485,100 485,10 515,10 515,220 470,220 470,100" className="white pianoKey" id="11" />

                        <polygon points="230,10 260,10 261,130 231,130 230,10" className="black pianoKey" id="1" />
                        <polygon points="275,10 305,10 306,130 276,130 275,10" className="black pianoKey" id="3" />
                        <polygon points="365,10 395,10 396,130 366,130 365,10" className="black pianoKey" id="6" />
                        <polygon points="410,10 440,10 441,130 411,130 410,10" className="black pianoKey" id="8" />
                        <polygon points="455,10 485,10 486,130 456,130 455,10" className="black pianoKey" id="10" />
                    </svg>
                </div>
                <button id="octave-up" onClick={this.octaveClick}>octave +</button>
                <button id="octave-down">octave -</button>
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
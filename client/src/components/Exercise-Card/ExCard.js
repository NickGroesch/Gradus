import React, { Component } from "react";
// import dbAPI from '../../utils/API/APIroute1';
import APIroute1 from "../../utils/API/APIroute1";
import Abcjs from "react-abcjs";

// const ExCard = (props) => {
class ExCard extends Component {
    constructor(props) {
        super(props);
        console.log("hello ", props)
    }

    state = {
        name: "",
        cantus: [],
        key: ""
    };

    componentDidMount = () => {
        // console.log("this is my props in excard!!!!!", this.props);
        APIroute1.analyze({
            exercise: { midi: this.props.midi, key: this.props.musicKey }
        }).then(res => {
            let abcStuff = res.data.voices.abc;
            this.setAbc(abcStuff);
            console.log("state ", this.state);
        });

        // dbAPI.findAll()
        //     .then((data) => {
        //         data.data.forEach((element, index) => {
        //             let cantus = {};
        //             // console.log("ele: ", element)
        //             cantus.name = element.name;
        //             cantus.midi = [element.midiArray];
        //             cantus.key = element.key;
        //             APIroute1.analyze({ exercise: { midi: cantus.midi, key: cantus.key } })
        //                 .then(res => {
        //                     let abcStuff = res.data.voices.abc;
        //                     this.setAbc(abcStuff);
        //                 })
        //             this.state.cantus.push(cantus);
        //         });
        //         console.log(this.state.cantus);
        //         // this.state.cantus.forEach()
        // });
    };

    setAbc(tomStuff) {
        let abcHeader = `X:1\nT:Cantus Firmus ${this.props.name}\nM:4/4\nK:${
            this.props.musicKey
            }\nL:1/1\n`;
        let abcBody = "";
        let abcData = tomStuff;
        console.log("line 42", this.state.cantus);
        console.log("line 43", abcData);
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
        this.setState({ abcjs: abcScore });
    }

    render(props) {
        return (
            <a href={this.props.link}>
                {console.log("ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ", this.props.link)}
                <div className="card">
                    {/* <div className="card-header">
            Exercise Name: {this.state.name}
          </div> */}
                    <div className="card-body">
                        {/* <p>Key: {this.state.key}</p> */}
                        {/* <p>{this.state.cantus}</p> */}
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
                </div>
            </a>
        );
    }
}
export default ExCard;

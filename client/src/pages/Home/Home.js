import React, { Component } from "react";
// import Abcjs from "react-abcjs";
import dbAPI from "../../utils/API/APIroute1";
import ExCard from "../../components/Exercise-Card/ExCard";
import "./style.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.hidden = this.hidden.bind(this);
    this.state = { collapse: false, cantus: [] };
  }

  hidden() {
    this.setState(state => ({ collapse: !state.collapse }));
    console.log(this.state.collapse)
  }

  componentDidMount() {
    dbAPI.findAll().then(data => {
      console.log("XXXXX", data)
      // this.setState({ cantus: data.data })
      if (data.data) {


        let cantArr = []
        let test = [{
          "_id": {
            "$oid": "5cd49236e7179a2e1964de1c"
          },
          "name": "1-21b",
          "key": "C",
          "midiArray": [
            60,
            62,
            64,
            65,
            67,
            62,
            65,
            64,
            62,
            60
          ]
        },
        { name: "1-21a", composer: "Schenker", key: "C", midiArray: [60, 62, 65, 64, 65, 67, 69, 67, 64, 62, 60] },
        { name: "1-21c", key: "Eb", midiArray: [60, 62, 65, 63, 68, 67, 65, 62, 63, 62, 60] },
        { name: "1-21d", key: "D", midiArray: [62, 67, 66, 71, 69, 66, 67, 66, 64, 62] },
        { name: "1-21e", composer: "Fux", key: "F", midiArray: [62, 65, 64, 62, 67, 65, 69, 67, 65, 64, 62] }
        ]
        test.map((element, index) => {
          let cantus = {};
          // console.log("ele: ", element)
          cantus.name = element.name;
          cantus.midi = [element.midiArray];
          cantus.key = element.key;
          // APIroute1.analyze({ exercise: { midi: cantus.midi, key: cantus.key } })
          //     .then(res => {
          //         // let abcStuff = res.data.voices.abc;
          //         // this.setAbc(abcStuff);
          //     })
          cantArr.push(cantus)
          // this.setState({ cantus: cantus});
        });
        this.setState({ cantus: cantArr });
        console.log(this.state.cantus);
        // this.state.cantus.forEach()
      }
    });
  }
  // componentDidMount() {
  //   this.test();
  // }
  test = () => {
    dbAPI.findAll().then(data => {
      console.log(data.data);
      this.setState({ cantus: data.data })
    })
  }

  ListCard = () => {
    // this.test();
    return (
      <div>
        {this.state.cantus.map((value, index) => {
          console.log("***", value.midiArray)
          return (
            <ExCard
              name={value.name}
              midi={value.midi}
              // midi={value.midiArray}
              musicKey={value.key}
              key={index}
            />
          );
        })}


        {/* {friends.map(friend => (
        <SpongeBobCard
          obj={friend}
          key={friend.id}
        />
      ))
      } */}
      </div>
    );
  };

  render() {
    return (
      <div className="container">
        <div id="wrapper">
          <button id="pickButton" onClick={this.hidden}>
            PICK EXERCISE
          </button>
        </div>
        {this.state.collapse && this.ListCard()}

        <div id="wrapper">
          <button id="createButton">
            <p>CREATE EXERCISE</p>
            <p> (coming soon)</p>
          </button>
        </div>
      </div>
    );
  }
}

export default Home;

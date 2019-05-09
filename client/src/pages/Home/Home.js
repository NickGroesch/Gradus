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
  }

  componentDidMount() {
    dbAPI.findAll().then(data => {
      data.data.forEach((element, index) => {
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
        this.state.cantus.push(cantus);
      });
      console.log(this.state.cantus);
      // this.state.cantus.forEach()
    });
  }

  ListCard = () => {
    return (
      <div>
        {this.state.cantus.map((value, index) => {
          return (
            <ExCard
              name={value.name}
              midi={value.midi}
              musicKey={value.key}
              key={value._id}
              // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++THIS IS NOT RIGHT
              link={"/exercise/" + value._id} />
          );
        })}
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

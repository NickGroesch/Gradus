import React, { Component } from "react";
import dbAPI from '../../utils/API/APIroute1';

// const ExCard = (props) => {
class ExCard extends Component {
    // console.log("hello ", props)
    state = {

    }

    componentDidMount = () => {

        dbAPI.findAll()
            .then((data) => {
                console.log("done", data);

            });
    }
    render() {
        return (
            <div className="card">
                <div className="card-header">
                    Exercise Name:
                </div>
                <div className="card-body">
                    <p>Key: </p>
                    <p>Preview Cantus Firmus </p>
                    <a href="/pick-exercise" className="btn btn-primary">Select</a>
                </div>
            </div>
        )
    }

}
export default ExCard;
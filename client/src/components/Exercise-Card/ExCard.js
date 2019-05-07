import React, { Component } from "react";
import "./style.css";

class ExCard extends Component {
    state = {
        name: "",
        src: ""
    }

    render() {
        return (
            <div class="card">
                <div class="card-header">
                    {this.state.name}
                </div>
                <div class="card-body">
                    <p>{this.state.src}</p>
                    <a href="/pick-exercise" class="btn btn-primary">Select</a>
                </div>
            </div>
        )
    }
}
export default ExCard;
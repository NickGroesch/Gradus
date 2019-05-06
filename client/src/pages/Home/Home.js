// Home.js

import React, { Component } from 'react';


export default class Home extends Component {


    render() {
        return (

            <div className="btn-group">
                <button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Course Work
            </button>

                <div>
                    <button
                        onclick>PICK</button>
                </div>

                <div className="dropdown-menu dropdown-menu-right">
                    <button className="dropdown-item" type="button">Action</button>
                    <button className="dropdown-item" type="button">Another action</button>
                    <button className="dropdown-item" type="button">Something else here</button>
                </div>
            </div>

        );
    }
}
import React, { Component } from 'react';
import ExCard from '../../components/Exercise-Card/ExCard';


class Home extends Component {

    constructor(props) {
        super(props);
        this.hidden = this.hidden.bind(this);
        this.state = { collapse: false };
    }

    hidden() {
        this.setState(state => ({ collapse: !state.collapse }));
    }

    render() {
        return (
            <div>
                <button id="pickButton" onClick={this.hidden}>PICK</button>
                {this.state.collapse && <ListCard />}
            </div>
        );
    }
}

function ListCard() {
    return (
        <div>
            <ExCard />
            {/* {friends.map(friend => (
        <SpongeBobCard
          obj={friend}
          key={friend.id}
        />
      ))
      } */}
        </div>
    )

}

export default Home;
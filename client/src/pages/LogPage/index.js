import React, { Component } from "react";

class LogPage extends Component {
  state = {
    userName: "",
    password: ""
  };

  handleInputChange = event => {
    let value = event.target.value;
    const name = event.target.name;

    if (name === "password") {
      value = value.substring(0, 15);
    }

    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (!this.state.userName) {
      alert("Please input your username");
    } else if (this.state.password.length < 6) {
      alert("Password longer than 6 letters");
    }

    this.setState({
      userName: "",
      password: ""
    });
  };

  routeChange() {
    let path = `/exercise`;
    this.props.history.push(path);
  }

  render() {
    <div>
      <form className="form">
        <input
          value={this.state.firstName}
          name="firstName"
          onChange={this.handleInputChange}
          type="text"
          placeholder="First Name"
        />
        <input
          value={this.state.password}
          name="password"
          onChange={this.handleInputChange}
          type="password"
          placeholder="Password"
        />
        <button onClick={this.routeChange}>Submit</button>
      </form>
    </div>;
  }
}

export default LogPage;

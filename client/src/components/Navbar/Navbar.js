// Navbar.js

import React, { Component } from "react";
// import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authentication";
import { withRouter } from "react-router-dom";
import logo from "./img/gradus_logo.svg";
import "./style.css";

class Navbar extends Component {
  onLogout(e) {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const authLinks = (
      <React.Fragment>
        <a
          href="..."
          className="nav-log signIn"
          onClick={this.onLogout.bind(this)}
        >
          <img
            src={user.avatar}
            alt={user.name}
            title={user.name}
            className="rounded-circle"
            style={{ width: "25px", marginRight: "10px" }}
          />
          Logout
        </a>
        <a className="nav-log dashboard" href="/home">
          Dashboard
        </a>
      </React.Fragment>
    );
    const guestLinks = (
      <React.Fragment>
        <a className="nav-log signIn" href="/login">
          Sign In
        </a>
        <a className="nav-log signUp" href="/register">
          Sign Up
        </a>
      </React.Fragment>
    );
    return (
      <nav>
        <a className="navbar-brand" href="/">
          <img className="logo" src={logo} alt="" />
        </a>

        {isAuthenticated ? authLinks : guestLinks}
      </nav>
    );
  }
}
Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(withRouter(Navbar));

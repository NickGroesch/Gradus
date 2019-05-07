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
      <ul className="navbar-nav ml-auto">
        <a href="/home">Dashboard</a>
        <a href="#" className="nav-link" onClick={this.onLogout.bind(this)}>
          <img
            src={user.avatar}
            alt={user.name}
            title={user.name}
            className="rounded-circle"
            style={{ width: "25px", marginRight: "5px" }}
          />
          Logout
        </a>
      </ul>
    );
    const guestLinks = (
      <section>
        <a className="nav-log signIn" href="/login">
          Sign In
        </a>
        <a className="nav-log signUp" href="/register">
          Sign Up
        </a>
      </section>
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

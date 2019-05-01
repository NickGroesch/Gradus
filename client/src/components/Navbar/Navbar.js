import React from "react";
import "./style.css";
import logo from "./img/gradus_logo.svg";

function Navbar() {
  return (
    <div>
      <nav className="navbar">
        <img className="logo" alt="" src={logo} href="/" />

        <a href="/" className="nav-log signOut">
          Sign Out
        </a>
        <a href="/register" className="nav-log signUp">
          Sign Up
        </a>
      </nav>
    </div>
  );
}

export default Navbar;

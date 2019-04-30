import React from "react";
import "./style.css";
import logo from "./img/gradus_logo.svg";

function Navbar() {
  return (
    <div>
      <nav className="navbar">
        <img className="logo" src={logo} href="/" />

        <a className="nav-log">Sign Out</a>
      </nav>
    </div>
  );
}

export default Navbar;

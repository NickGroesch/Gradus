import React from "react";
import "./style.css";
import logo from "./img/gradus_logo.svg";

function Navbar() {
  return (
    <div>
      <nav className="navbar">
        <img className="logo" src={logo} href="/" alt="" />

        <div className="nav-log signOut">Sign Out</div>
        <div className="nav-log signUp">Sign Up</div>
      </nav>
    </div>
  );
}

export default Navbar;

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// Nick Component
import Graph from "./components/graphs";
// // Sarah Component
// import Piano from "./components/virtualPiano/virtualPiano";

import Exercise from "./pages/Exercise/index"
import ExCard from "./components/Exercise-Card/ExCard"

//Mahfouz components
import Navbar from "./components/Navbar/Navbar";
import Register from "./components/Register";
import Home from "./pages/Home/Home";
import Login from "./components/LogIn/Login";
import { Provider } from "react-redux";
import store from "./components/actions/store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./components/actions/setAuthToken";
import {
  setCurrentUser,
  logoutUser
} from "./components/actions/authentication";

//Michael components
import Midi from "./components/Midi/MidiTest";
import Abcjs from "react-abcjs";

//Ky components
import Landing from "./pages/Landing/index";
import "./index.css";
import Graphs from "./components/graphs";

// if (localStorage.jwtToken) {
//   setAuthToken(localStorage.jwtToken);
//   const decoded = jwt_decode(localStorage.jwtToken);
//   store.dispatch(setCurrentUser(decoded));

//   const currentTime = Date.now() / 1000;
//   if (decoded.exp < currentTime) {
//     store.dispatch(logoutUser());
//     window.location.href = "/login";
//   }
// }

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <Route exact path="/home" component={Home} />


          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </div>
          <Route exact path="/pick-exercise" component={Exercise} />


        </div>
      </Router>
    </Provider>
  );
}

export default App;

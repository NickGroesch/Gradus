import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// Nick Component
import Graph from "./components/graphs";
// // Sarah Component
// import Piano from "./components/virtualPiano/virtualPiano";

//Mahfouz components
// import Navbar from "./components/Navbar/Navbar";
// import Register from "./components/Register";
import Home from "./pages/Home/Home";
// import Login from "./components/LogIn/Login";
// import { Provider } from "react-redux";
// import store from "./store";
// import jwt_decode from "jwt-decode";
// import setAuthToken from "./components/actions/setAuthToken";
// import {
//   setCurrentUser,
//   logoutUser
// } from "./components/actions/authentication";

//Michael components
<<<<<<< HEAD
// import Midi from "./components/Midi/MidiTest";
=======
import Midi from "./components/Midi/MidiTest";
>>>>>>> master
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
<<<<<<< HEAD
    // <Provider store={store}>
    <Router>
      {/* <div> */}
      {/* <Navbar /> */}
      {/* <Route exact path="/" component={Landing} /> */}
      {/* <Route exact path="/home" component={Home}> */}
      <Graphs />
      {/* <Midi /> */}
      {/* <Abcjs
          abcNotation={
            //X: 1 stave T: title of rendered staff C: composer K: key(G in this case) "|": bar line
            "X:1\nT:Example\nM:4/4\nC:Trad.\nK:G\n|:gc'c,c dedB|dedB dedB|c2ec B2dB|c2A2 A2BA|"
            // this.state.abc
          }
          parserParams={{}}
          engraverParams={{ responsive: "resize" }}
          renderParams={{ viewportHorizontal: true }}
        /> */}
      {/* </Route> */}
      <div className="container">
        {/* <Route exact path="/register" component={Register} /> */}
        {/* <Route exact path="/login" component={Login} /> */}
      </div>
    </Router>
  )
  {/* </Provider > */ }
  {/* //Mahfouz app */ }

=======
    <Provider store={store}>
      <Router>
        <div>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <Route exact path="/home" component={Home}>
            <Graphs />
            <Midi />
          </Route>
          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </div>
        </div>
      </Router>
    </Provider>
  );
>>>>>>> master
}

export default App;

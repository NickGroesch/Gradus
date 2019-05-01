import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Sarah Component
import Piano from "./components/virtualPiano/virtualPiano";

//Mahfouz components
import Navbar from "./components/Navbar/Navbar";
import Register from "./components/Register";
import Home from "./components/Home";
import Login from "./components/Login";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authentication";

//Michael components
import Midi from "./components/Midi/MidiTest";

//Ky components
import LogPage from "./pages/LogPage/index";
import Landing from "./pages/Home/index";
import Exercise from "./pages/Exercise/index";
import "./index.css";

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <Route exact path="/exercise" component={Exercise}>
            <Midi />
          </Route>
          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </div>
        </div>
      </Router>
    </Provider>
    //Mahfouz app

    //===================================
    //Ky App
    // <Router>
    //   <div>
    //     <Navbar />
    //     <Switch>
    //       <Route exact path="/" component={Home} />
    //       <Route exact path="/logPage" component={LogPage} />
    //       <Route exact path="/exercise" component={Exercise} />
    //     </Switch>
    //   </div>
    // </Router>
  );
}

export default App;

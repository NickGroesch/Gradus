import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Exercise from "./pages/Exercise/index";
import Navbar from "./components/Navbar/Navbar";
import LogPage from "./pages/LogPage/index";
import "./index.css";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/logPage" component={LogPage} />
          <Route exact path="/exercise" component={Exercise} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

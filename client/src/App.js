import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Exercise from "./pages/Exercise/index";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/exercise" component={Exercise} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

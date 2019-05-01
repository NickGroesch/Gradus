import React from "react";
import Graphs from "./components/graphs";
import "./App.css";
import Midi from "./components/MidiTest";
import Piano from "./components/virtualPiano/virtualPiano";

function App() {
  return (
    <div>
      hello world
      <div>
        <Graphs />
        <Piano />
      </div>
    </div>
  );
}

export default App;

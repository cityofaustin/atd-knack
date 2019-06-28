import React from "react";
import "./App.css";
import SelectLocation from "./SelectLocation";
require("dotenv").config();

function App() {
  return (
    <div className="App">
      <SelectLocation />
    </div>
  );
}

export default App;

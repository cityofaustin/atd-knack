import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import "./App.css";
import SelectLocation from "./SelectLocation";
import Calcs from "./calcs";
require("dotenv").config();

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <div className="App">
                <SelectLocation />
              </div>
            )}
          />
          <Route exact path="/calcs" render={() => <Calcs />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

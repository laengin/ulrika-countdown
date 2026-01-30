import React from "react";
import "./index.css";
import Heading from "./Heading";
import DateTime from "./DateTime";
import Today from "./Today";
import TimeDifference from "./TimeDifference";
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

const targetDate = "2026-06-30T18:00:00";
const startDate = "1987-10-01T08:00:00";

export default function App() {
  return (
    <div className="App wrapper">
      <Heading />
      <TimeDifference startText="Das bedeutet noch..." endText="...bis zum Zieltermin." targetDateTime={targetDate} />
    </div>
  );
}

/*
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/

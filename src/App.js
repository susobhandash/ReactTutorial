import React from 'react';
// import logo from './logo.svg';
import './App.css';
import {SearchMovices} from "./components/searchMovies";

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
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
      </header> */}
      <h1 className="mt-0">Search Movies</h1>
      {/* <SearchMovices/> */}
      {SearchMovices()}
    </div>
  );
}

export default App;

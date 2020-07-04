import React from 'react';
// import logo from './logo.svg';
import './App.css';
import SearchMovies from "./components/searchMovies";

function App() {
  return (
    <div className="App neo-shadow">
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
      <h1>Search Movies</h1>
      <SearchMovies/>
    </div>
  );
}

export default App;

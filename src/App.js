import React from 'react';
import logo from './logo.svg';
import './App.css';
import Live from  './components/live'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Live />
      </header>
    </div>
  );
}

export default App;

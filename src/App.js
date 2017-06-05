import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Marvel from './marvel/Marvel'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <Marvel></Marvel>
      </div>
    );
  }
}

export default App;

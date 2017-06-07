import React, { Component } from 'react';
import './App.css';

import Marvel from './marvel/Marvel';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src="/logo.png" className="App-logo" alt="logo" />
        </div>
        <Marvel></Marvel>
      </div>
    );
  }
}

export default App;

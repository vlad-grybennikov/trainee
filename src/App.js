import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import News from "./components/News";
import CrossFit from "./components/CrossFit";

class App extends Component {
  render() {
    return (
      <div className="App">
          <CrossFit />

      </div>
    );
  }
}

export default App;

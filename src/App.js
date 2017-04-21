import React, { Component } from 'react';
import Papa from 'papaparse';
import logo from './logo.svg';
import './App.css';

Papa.parse('data.csv', {
	download: true,
  header: true,
  complete: function(results) {
		console.log(results);
	}
});

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;

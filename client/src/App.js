import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="row">
        <div class="col s12 m4 l3">
          <div className="input-field col s6">
            <input placeholder="Placeholder" id="first_name" type="text" className="validate" />
            <label for="first_name">First Name</label>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

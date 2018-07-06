import React, { Component } from 'react';
import { Input, Row } from 'react-materialize'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (

      <Row>
        <div class="col s12">

          <div className="input-field col s2"> 
            <Input type='text' label="Tag"/>
          </div>

          <div className="input-field col s2">
            <Input type='number' label="Limit"/>
          </div>

          <div className="input-field col s2"> 
            <Input type='number' label="Score"/>
          </div>

          <div class="input-field col s2">

            <Input type='select' label="Sort">
              <option value="1">Activity</option>
              <option value="2">Votes</option>
              <option value="3">Creation</option>
              <option value="3">Hot</option>
              <option value="3">Week</option>
              <option value="3">Month</option>
            </Input>

          </div>

        </div>
      </Row>


    );
  }
}

export default App;

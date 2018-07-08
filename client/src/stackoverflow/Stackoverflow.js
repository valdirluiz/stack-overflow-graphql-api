import React, { Component } from 'react';
import { Input, Row, Table, Button } from 'react-materialize'
import Questions from './Questions';
import { ApolloProvider } from "react-apollo";
import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
    uri: 'http://localhost:8000/'
});
class Stackoverflow extends Component {

  constructor(props) {
    super(props);
    this.state = { filters: { limit: 5, tag: 'JavaScript', score: 5, sort: 'activity'} };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
 
    
  }

  handleClick(state) {
    if(state.tag){
      state.filters.tag = state.tag;
    }
    if(state.limit){
      state.filters.limit = state.limit;
    }
    if(state.score){
      state.filters.score = state.score;  
    } 
    if(state.sort){
      state.filters.sort = state.sort;
    } 

    this.setState({
      state
    }); 
  }


  render() {
    return (
      <ApolloProvider client={client}>
        <Row>

          <Row>
            <Row>
              <div className="col s12">

                <div className="input-field col s3">
                  <Input type='text' name='tag' label="Tag"
                    placeholder="JavaScript"
                    onChange={this.handleInputChange}
                  />
                </div>

                <div className="input-field col s3">
                  <Input type='number' placeholder="5" onChange={this.handleInputChange} name="limit" label="Limit" />
                </div>

              <div className="input-field col s3">
                  <Input type='select' onChange={this.handleInputChange} name="sort" label="Sort">
                    <option value="activity">Activity</option>
                    <option value="votes">Votes</option>
                    <option value="creation">Creation</option>
                    <option value="hot">Hot</option>
                    <option value="week">Week</option>
                    <option value="month">Month</option>
                  </Input>
                </div>

                <div className="input-field col s3">{this.state.disableScore}
                  <Input type='number'  onChange={this.handleInputChange} 
                  disabled={this.state.disableScore} 
                  name="score" placeholder="Order by Votes" label="Min Votes" />
                  
                </div>

                

              </div>
            </Row>

            <Row>
              <div className="col s10">
              </div>
              <div className="col s2">
                <Button onClick={(e) => this.handleClick(this.state, e)} waves='light'>search</Button>
              </div>
            </Row>

          </Row>

          <Row>
            <Table>
              <thead>
                <tr>
                  <th data-field="id">#id</th>
                  <th data-field="title">Title</th>
                  <th data-field="score">Score</th>
                </tr>
              </thead> 
              <Questions limit={this.state.filters.limit} 
                          tag={this.state.filters.tag} 
                          score={this.state.filters.score} 
                          sort={this.state.filters.sort} /> 
            </Table>
          </Row>

        </Row>
      </ApolloProvider>

    );
  }
}

export default Stackoverflow;

import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import Papa from 'papaparse';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: {}
    }

    Papa.parse('data.csv', {
      download: true,
      header: true,
      complete: results => {
        let data = results.data;
        this.setState({data: data});
        console.log(data);
      }
    });
  }

  handlerClickCleanFiltered() {
    this.refs.firm.cleanFiltered();
    this.refs.stage.cleanFiltered();
    // this.refs.quality.cleanFiltered();
    // this.refs.price.cleanFiltered();
    // this.refs.satisfaction.cleanFiltered();
    // this.refs.inStockDate.cleanFiltered();
  }

  render() {

    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to VC Finder</h2>
          <p>Data by <a href="https://twitter.com/morganpolotan">Morgan Polotan</a></p>
          <p><a onClick={ this.handlerClickCleanFiltered.bind(this) } style={ { cursor: 'pointer' } }>clear filters</a></p>
        </div>
        <BootstrapTable ref='table' data={ Array.isArray(this.state.data)? this.state.data : [] }>
          <TableHeaderColumn dataField='Investor Name' dataSort={ true } isKey>Investor Name</TableHeaderColumn>
          <TableHeaderColumn ref='firm' dataField='Firm' dataSort={ true } filter={ { type: 'TextFilter', placeholder: 'Please enter a value' } }>Firm</TableHeaderColumn>
          <TableHeaderColumn ref='stage' dataField='Company Stage (check all)' dataSort={ true } filter={ { type: 'TextFilter', placeholder: 'Please enter a value' } }>Company Stage</TableHeaderColumn>

        </BootstrapTable>
      </div>
    );
  }
}

export default App;

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
    this.refs.focus.cleanFiltered();
    this.refs.checkSize.cleanFiltered();
    this.refs.location.cleanFiltered();
  }

  render() {

    return (
      <div className="App">
        <div className="App-header">
          <h2>VC Finder (alpha)</h2>
          <p>Made by <a href="https://twitter.com/html5cat">@html5cat</a> with data by <a href="https://twitter.com/morganpolotan">Morgan Polotan</a></p>
          <p><a onClick={ this.handlerClickCleanFiltered.bind(this) } style={ { cursor: 'pointer' } }>clear filters</a></p>
        </div>
        <BootstrapTable ref='table' data={ Array.isArray(this.state.data)? this.state.data : [] }>
          <TableHeaderColumn dataField='Investor Name' dataSort={ true } isKey>Investor Name</TableHeaderColumn>
          <TableHeaderColumn ref='firm' dataField='Firm' dataSort={ true } filter={ { type: 'TextFilter', placeholder: 'Please enter a value' } }>Firm</TableHeaderColumn>
          <TableHeaderColumn ref='stage' dataField='Company Stage (check all)' dataSort={ true } filter={ { type: 'TextFilter', placeholder: 'Please enter a value' } }>Company Stage</TableHeaderColumn>
          <TableHeaderColumn ref='location' dataField='Where I Invest (check all)' dataSort={ true } filter={ { type: 'TextFilter', placeholder: 'Please enter a value' } }>Where I Invest (check all)</TableHeaderColumn>
          <TableHeaderColumn ref='checkSize' dataField='Typical Check Size (check all)' dataSort={ true } filter={ { type: 'TextFilter', placeholder: 'Please enter a value' } }>Typical Check Size (check all)</TableHeaderColumn>
          <TableHeaderColumn ref='focus' dataField='Sectors I Focus On (check all)' dataSort={ true } filter={ { type: 'TextFilter', placeholder: 'Please enter a value' } }>Sectors I Focus On (check all)</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

// <TableHeaderColumn ref='notFocus' dataField="Probably Wouldn't Invest" dataSort={ true } filter={ { type: 'TextFilter', placeholder: 'Please enter a value' } }>Probably Wouldn't Invest</TableHeaderColumn>


export default App;

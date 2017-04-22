import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import Papa from 'papaparse';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    }

    Papa.parse('data.csv', {
      download: true,
      header: true,
      complete: results => {
        let data = results.data;
        this.setState({data});
        // console.log(data);
      }
    });
  }

  handlerClickCleanFiltered() {
    Object.keys(this.refs).map(ref => {
      return typeof this.refs[ref].cleanFiltered === "function" ? this.refs[ref].cleanFiltered() : false;
    });
  }

  render() {
    const options = {
      //  page: 1,  // which page you want to show as default
       sizePerPageList: [ {
         text: '20', value: 20
       }, {
         text: '50', value: 50
       }, {
         text: 'All', value: this.state.data?this.state.data.length:0
       } ], // you can change the dropdown list for size per page
       sizePerPage: 20,  // which size per page you want to locate as default
      //  pageStartIndex: 1, // where to start counting the pages
      //  paginationSize: 3,  // the pagination bar size.
       prePage: 'Prev', // Previous page button text
       nextPage: 'Next', // Next page button text
       firstPage: 'First', // First page button text
       lastPage: 'Last', // Last page button text
       paginationShowsTotal: this.renderShowsTotal,  // Accept bool or function
      //  paginationPosition: 'top'  // default is bottom, top and both is all available
       // hideSizePerPage: true > You can hide the dropdown for sizePerPage
       // alwaysShowAllBtns: true // Always show next and previous button
       // withFirstAndLast: false > Hide the going to First and Last page button
     };

    return (
      <div className="App">
        <div className="App-header">
          <h2>VC Finder (alpha)</h2>
          <p>Made by <a href="https://twitter.com/html5cat">@html5cat</a> with data by <a href="https://twitter.com/morganpolotan">Morgan Polotan</a></p>
          <p><a onClick={ this.handlerClickCleanFiltered.bind(this) } style={ { cursor: 'pointer' } }>clear filters</a></p>
        </div>
        <BootstrapTable ref='table' data={ this.state.data } pagination={ true } options={ options }>
          <TableHeaderColumn dataField='Investor Name' dataSort={ true } isKey>Investor Name</TableHeaderColumn>
          <TableHeaderColumn ref='firm' dataField='Firm' dataSort={ true } filter={ { type: 'TextFilter', placeholder: 'Please enter a value' } }>Firm</TableHeaderColumn>
          <TableHeaderColumn ref='stage' dataField='Company Stage' dataSort={ true } filter={ { type: 'TextFilter', placeholder: 'Please enter a value' } }>Company Stage</TableHeaderColumn>
          <TableHeaderColumn ref='location' dataField='Where I Invest' dataSort={ true } filter={ { type: 'TextFilter', placeholder: 'Please enter a value' } }>Where I Invest</TableHeaderColumn>
          <TableHeaderColumn ref='checkSize' dataField='Typical Check Size' dataSort={ true } filter={ { type: 'TextFilter', placeholder: 'Please enter a value' } }>Typical Check Size</TableHeaderColumn>
          <TableHeaderColumn ref='focus' dataField='Sectors I Focus On' dataSort={ true } filter={ { type: 'TextFilter', placeholder: 'Please enter a value' } }>Sectors I Focus On</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

// <TableHeaderColumn ref='notFocus' dataField="Probably Wouldn't Invest" dataSort={ true } filter={ { type: 'TextFilter', placeholder: 'Please enter a value' } }>Probably Wouldn't Invest</TableHeaderColumn>


export default App;

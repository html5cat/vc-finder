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
        // console.log(data);
      }
    });
  }

  handlerClickCleanFiltered() {
    this.refs.name.cleanFiltered();
    this.refs.name2.cleanFiltered();
    this.refs.quality.cleanFiltered();
    this.refs.price.cleanFiltered();
    this.refs.satisfaction.cleanFiltered();
    this.refs.inStockDate.cleanFiltered();
  }

  render() {

    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to VC Finder</h2>
        </div>
        <BootstrapTable ref='table' data={ Array.isArray(this.state.data)? this.state.data : [] }>
          <TableHeaderColumn dataField='Investor Name' isKey>
            Investor Name
            <br/><a onClick={ this.handlerClickCleanFiltered.bind(this) } style={ { cursor: 'pointer' } }>clear filters</a>
          </TableHeaderColumn>

          <TableHeaderColumn ref='firm' dataField='Firm' filter={ { type: 'TextFilter', placeholder: 'Please enter a value' } }>Firm</TableHeaderColumn>

        </BootstrapTable>
      </div>
    );
  }
}

// const qualityType = {
//   0: 'good',
//   1: 'bad',
//   2: 'unknown'
// };
//
// function enumFormatter(cell, row, enumObject) {
//   return enumObject[cell];
// }
//
// function dateFormatter(cell, row) {
//   return `${('0' + cell.getDate()).slice(-2)}/${('0' + (cell.getMonth() + 1)).slice(-2)}/${cell.getFullYear()}`;
// }
//
// const satisfaction = [ 0, 1, 2, 3, 4, 5 ];
//
// class AllFilters extends React.Component {
//
//   handlerClickCleanFiltered() {
//     this.refs.name1.cleanFiltered();
//     this.refs.name2.cleanFiltered();
//     this.refs.quality.cleanFiltered();
//     this.refs.price.cleanFiltered();
//     this.refs.satisfaction.cleanFiltered();
//     this.refs.inStockDate.cleanFiltered();
//   }
//
//   render() {
//     return (
//       <BootstrapTable ref='table' data={data}>
//         <TableHeaderColumn dataField='id'>
//           Product ID
//           <br/><a onClick={ this.handlerClickCleanFiltered.bind(this) } style={ { cursor: 'pointer' } }>clear filters</a>
//         </TableHeaderColumn>
//         <TableHeaderColumn ref='name1' dataField='name' filter={ { type: 'TextFilter', placeholder: 'Please enter a value' } }>Product Name</TableHeaderColumn>
//         <TableHeaderColumn ref='name2' dataField='name' filter={ { type: 'RegexFilter', placeholder: 'Please enter a regex' } }>Product Name</TableHeaderColumn>
//         <TableHeaderColumn ref='quality' dataField='quality' filter={ { type: 'SelectFilter', options: qualityType } } dataFormat={ enumFormatter } formatExtraData={ qualityType }>Product Quality</TableHeaderColumn>
//         <TableHeaderColumn ref='price' dataField='price' filter={ { type: 'NumberFilter', delay: 1000 } }>Product Price</TableHeaderColumn>
//         <TableHeaderColumn ref='satisfaction' dataField='satisfaction' filter={ { type: 'NumberFilter', options: satisfaction } }>Buyer Satisfaction</TableHeaderColumn>
//         <TableHeaderColumn ref='inStockDate' dataField='inStockDate' filter={ { type: 'DateFilter' } } dataFormat={ dateFormatter }>In Stock From</TableHeaderColumn>
//       </BootstrapTable>
//     );
//   }
// }

export default App;

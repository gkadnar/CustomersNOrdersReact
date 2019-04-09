import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import './App.css';
import CustomerList from './components/CustomerList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppBar position="static" color="default">
          <Toolbar>Customers List</ Toolbar>
        </AppBar>
        <CustomerList />
      </div>
    );
  }
}

export default App;
import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Home from './Home';
import AccountInfo from './AccountInfo';

class App extends Component {
  render() {
    return (
      <div>
        <Route path="/(access_token.*)?"/* this is saying exactly / plus access token... will go to the home component*/ exact component={Home} />
        <Route path="/private" component={AccountInfo} />
      </div>
    );
  }
}

export default App;

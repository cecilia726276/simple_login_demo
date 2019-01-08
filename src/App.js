import React, { Component } from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import RootRouter from './router/RootRouter';
import 'antd/dist/antd.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
          <Router>
              <div>
                  <RootRouter />
              </div>
          </Router>
      </div>
    );
  }
}

export default App;

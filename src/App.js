import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import { observer, inject } from 'mobx-react'
import './App.css';

import { observer, inject } from "mobx-react"
@inject("user", "usersStore")
@observer

class App extends Component {



  render() {
    return (


      <div>
        <Router>

        </Router>
      </div>
    );
  }
}


export default App;

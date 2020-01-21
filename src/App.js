import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import { observer, inject } from 'mobx-react'
import './App.css';
import Map from "./components/Map"
import Locations from "./components/RenderedByMap/Locations"


@inject("user", "usersStore")
@observer

class App extends Component {



  render() {
    return (
      <Router>
        <div id="main-container">
          <div id="main-links">
            <Link to="/map" className="link">Map</Link>
          </div>

          <Route path="/map" exact component={Map} />
          <Route path="/map/:location" exact render={({match}) => <Locations match={match}/>} />

        </div>
      </Router>
    );
  }
}


export default App;

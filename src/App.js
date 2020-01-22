import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
// import { GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import { observer, inject } from 'mobx-react'
import './App.css';
// import MapDisplay from "./components/MapDisplay"
import Users from "./components/RenderedByMap/Users"
import User from "./components/RenderedByMap/User"
import MapContainer from "./components/MapContainer"
import Locations from './components/Locations'
// import CurrentLocation from "./components/CurrentLocation"
require('dotenv').config()




@inject("user", "usersStore")
@observer


class App extends Component {
    

    componentDidMount() {
        this.props.usersStore.getUsers()
    }

    render() {
        //isloggiedIn? map component (axios post to yoni with id in the store) : wizard
        return (
            <Router>
                <div id="main-container">
                    {/* <div id="main-links">
                        <Link to="/map" className="link">Map</Link>
                    </div> */}
                    {/* need to change path to /map when finished testing */}
                    <Route path="/" exact render={({ match }) => <><MapContainer /> <Locations/> </>} />
                    <Route path="/map/:location" exact render={({ match }) => <Users match={match} />} />
                    <Route path="/user/:location/:firstName" exact render={({ match }) => <User match={match} />} />
                </div>
            </Router>
        );
    }
}



export default App
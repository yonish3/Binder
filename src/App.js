import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

import { observer, inject } from 'mobx-react'
import './App.css';
import Login from "./components/Login/Login"
import Users from "./components/RenderedByMap/Users"
import User from "./components/RenderedByMap/User"
import MapContainer from "./components/MapContainer"
import Locations from './components/Locations'
// import CurrentLocation from "./components/CurrentLocation"
import Profile from './components/RenderedByMap/Profile'
import UserForm from "./components/Wizard/UserForm"
import Tap from './components/Tap'
import Header from './components/Header'
import Settings from './components/Settings'
import Notifications from './components/Notifications';
require('dotenv').config()

@inject("user", "usersStore", "locationsStore", "myProfile", "socketStore")
@observer
class App extends Component {

    componentDidMount() {
        // this.props.usersStore.getUsers()
        // this.props.myProfile.getProfile()
       
        this.props.socketStore.recieveMessage();

    }

    render() {

        //isloggiedIn? map component (axios post to yoni with id in the store) : wizard
        return (
            <Router>
                {this.props.socketStore.checked
                    ? <Tap />
                    : <div id="main-container">
                        {!this.props.user.isLoggedIn ?
                            <Route path="/" exact component={Login} /> : <Route path="/" exact render={({ match }) => <> <MapContainer /> <Locations /> </>} />}
                            <Header />
                        <Route path="/register" exact render={({ match }) => <UserForm match={match} />} />
                        <Route path="/map/:location" exact render={({ match }) => <Users match={match} />} />
                        <Route path="/user/:id" exact render={({ match }) => <Profile match={match} />} />
                        <Route path='/notifications' exact render={({ match }) => <Notifications match={match} />} /> 
                    </div>
    
                }
            </Router>
        );
    }
}



export default App
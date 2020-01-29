import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

import { observer, inject } from 'mobx-react'
import './App.css';
import Login from "./components/Login/Login"
import Users from "./components/RenderedByMap/Users"
import MapContainer from "./components/MapContainer"
import Locations from './components/Locations'
import Profile from './components/RenderedByMap/Profile'
import UserForm from "./components/Wizard/UserForm"
import Notification from './components/Notification'
import Header from './components/Header'
import Footer from "./components/Footer"
import Settings from './components/Settings'
import axios from 'axios';
import EditProfile from "./components/EditProfile"
import AwaitingNotification from "./components/AwaitingNotification"
require('dotenv').config()

@inject("user", "locationsStore", "myProfile", "socketStore")
@observer
class App extends Component {

    async componentDidMount() {
        // this.props.usersStore.getUsers()
        // this.props.myProfile.getProfile()
       
        this.props.socketStore.recieveMessage();
        axios.defaults.withCredentials = true;


        // const response = axios.get(`http://localhost:8080/home`)
        // response.then(response => console.log(response))
        // .catch(err => console.log(err))
        try {
            
            const response = await axios.get(`http://localhost:8080/home`)
            console.log("in componentDidMount: response is: ", response);
            this.props.user.logIn()
            
        } catch(err) {
            console.log('Error is ', err);
            
        }
    }

    render() {

        //isloggiedIn? map component (axios post to yoni with id in the store) : wizard
        return (
            <Router>
                {this.props.socketStore.checked ?
                    <Notification />
                    :
                    <div id="main-container">
                        {console.log(this.props.socketStore.nearbyUsers)}
                        {!this.props.user.isLoggedIn ?
                            <Route path="/" exact component={Login} /> : <Route path="/" exact render={({ match }) => <> <MapContainer /> <Locations /> </>} />}
                        <Header />
                        
                        <Route path="/register" exact render={({ match }) => <UserForm match={match} />} />
                        {this.props.user.isCheckedIn ? <Route path="/map/:location" exact render={({ match }) => <><Users match={match} /></>} /> : null }
                        <Route path="/user/:id" exact render={({ match }) => <><Profile match={match} /></>} />
                        <Route path="/editProfile" exact render={({match}) => <EditProfile />}/>
                        <Route path="/settings" exact render={({match}) => <Settings />}/>
                        <Route path="/notifications" exact render={({match}) => <AwaitingNotification />}/>
                    </div>

                }
            </Router>
        );
    }
}



export default App
import React, { Component } from 'react';
import { observer, inject } from "mobx-react"
import { Route, Link } from "react-router-dom"
import Locations from "../Locations"
import MapContainer from "../MapContainer"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import axios from "axios"

@inject("user", "usersStore", "locationsStore", "myProfile", "socketStore")
@observer

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
        }
    }

    handleChange = (input) => (event) => {
        this.setState({
            [input]: event.target.value
        })
    }

    submit = async (event) => {
        event.preventDefault()
        axios.defaults.withCredentials = true;
        const loginInformation = { address: this.state.email, password: this.state.password }
        const checkIfUserExists = await axios.post('http://localhost:8080/login', loginInformation)
        if (checkIfUserExists.data === "Welcome") {
            this.props.user.logIn()
        } else {
            alert("Incorrect Email Address/Password")
        }
    }

    render() {

        return (
            
            <MuiThemeProvider>
                {/* {!this.props.user.isLoggedIn ?  */}
                <React.Fragment>

                    <AppBar title="Login" />
                    <TextField
                        hintText="Enter Your Email"
                        floatingLabelText="Email"
                        onChange={this.handleChange('email')}
                        defaultValue={this.state.email}
                        type="email"
                    />
                    <br />
                    <TextField
                        hintText="Enter Your Password"
                        floatingLabelText="Password"
                        onChange={this.handleChange('password')}
                        defaultValue={this.state.password}
                        type="password"
                    />
                    <br />
                    <RaisedButton label="Submit" primary={true} style={styles.button} onClick={this.submit} />
                    <hr />
                    <Link to="/register" className="link">
                    <RaisedButton label="Create Account" primary={true} style={styles.button}/>
                    </Link>
                </React.Fragment>
            </MuiThemeProvider>

        )
    }
}

const styles = {
    buttons: {
        margin: 15
    }
}

export default Login
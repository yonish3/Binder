import React, { Component } from 'react';
import { observer, inject } from "mobx-react"
import { Link } from "react-router-dom"
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';

@inject("user", "usersStore", "locationsStore", "myProfile", "socketStore")
@observer

class Succsess extends Component{
    // constructor(){
    //     super();
    //     this.state = {
    //     }
    // }
    continue = event => {
        event.preventDefault()
        this.props.nextStep()

    }
    back = event => {
        event.preventDefault()
        this.props.previousStep()
    }

    render(){
        // const { values:{firstName,lastName, age, status, desiredRelationship, interstedIn , gender,  picture }} = this.props
        return (
               <MuiThemeProvider>
                   <React.Fragment>
                       <AppBar title="Success" />
                       <h1>Thank You For Your Submission</h1>
                       <Link to="/" className="link">
                    <RaisedButton label="Login" primary={true} style={styles.button}/>
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


export default Succsess;
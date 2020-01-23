import React, { Component } from 'react';
import { observer, inject } from "mobx-react"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { StylesProvider } from '@material-ui/core';
@inject("user", "usersStore", "locationsStore", "myProfile", "socketStore")
@observer

class FormPersonalDetails extends Component{
    continue = event => {
        event.preventDefault()
        this.props.nextStep()

    }

    back = event => {
        event.preventDefault()
        this.props.previousStep()

    }

    render(){
        const { values, handleChange } = this.props
        return (
               <MuiThemeProvider>
                   <React.Fragment>
                       <AppBar title="Enter User Details" />
                       <TextField 
                       hintText="Enter Your Desired Relationship"
                       floatingLabelText="Desired Relationship"
                       onChange={handleChange('desiredRelationship')}
                       defaultValue={values.desiredRelationship}
                       />
                       <br/>
                       <TextField 
                       hintText="Enter Your Interested In"
                       floatingLabelText="Interested In"
                       onChange={handleChange('interedtedIn')}
                       defaultValue={values.interedtedIn}
                       />
                       <br/>
                       <TextField 
                       hintText="Enter Your Gender"
                       floatingLabelText="Gender"
                       onChange={handleChange('gender')}
                       defaultValue={values.gender}
                       />
                       <br/>
                       <TextField 
                       hintText="Enter Your Picture"
                       floatingLabelText="Picture"
                       onChange={handleChange('picture')}
                       defaultValue={values.picture}
                       />
                       <br/>
                       <RaisedButton label="Continue" primary={true} style={styles.button} onClick={this.continue}/>
                       <RaisedButton label="Back" primary={false} style={styles.button} onClick={this.back}/>
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

export default FormPersonalDetails
import React, { Component } from 'react';
import { observer, inject } from "mobx-react"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { StylesProvider } from '@material-ui/core';
import axios from 'axios';
@inject("user", "usersStore", "locationsStore", "myProfile", "socketStore")
@observer

class FormPersonalDetails extends Component{
    state={
        selectedFile:null
    }
    continue = event => {
        event.preventDefault()
        this.props.nextStep()

    }

    back = event => {
        event.preventDefault()
        this.props.previousStep()

    }

    x= event=> {
        this.setState({
            selectedFile:event.target.files[0]
        })
    

    }
    uploadFile=async ()=> {
        const abc = await axios.post("gs://binder-1579608819026.appspot.com/", this.state.selectedFile)
        console.log(abc)
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
                       type="file"
                       floatingLabelText="Picture"
                       onChange={this.x}
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
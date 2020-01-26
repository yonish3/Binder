import React, { Component } from 'react';
import { observer, inject } from "mobx-react"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from "material-ui/SelectField"
import { StylesProvider } from '@material-ui/core';
@inject("user", "usersStore", "locationsStore", "myProfile", "socketStore")
@observer

class FormUserDetails extends Component{
    // constructor(){
    //     super();
    //     this.state = {
    //     }
    // }
    continue = event => {
        event.preventDefault()
        this.props.nextStep()

    }

    render(){
        const { values, handleChange } = this.props
        return (
               <MuiThemeProvider>
                   <React.Fragment>
                       <AppBar title="Enter User Details" />
                       <TextField 
                       hintText="Enter Your First Name"
                       floatingLabelText="First Name"
                       onChange={handleChange('firstName')}
                       defaultValue={values.firstName}
                       type="text"
                       />
                       <br/>
                       <TextField 
                       hintText="Enter Your Last Name"
                       floatingLabelText="Last Name"
                       onChange={handleChange('lastName')}
                       defaultValue={values.lastName}
                       type="text"/>
                       <br/>
                       <TextField 
                       hintText="Enter Your Age"
                       floatingLabelText="Age"
                       onChange={handleChange('age')}
                       defaultValue={values.age}
                       type="number" min="18" max="100"/>
                       <br/>
                       <TextField 
                       hintText="Enter Your Status"
                       floatingLabelText="Status"
                       onChange={handleChange('status')}
                       defaultValue={values.status}
                       type="select" select="true"/>
                        <SelectField />
                       {/* <select id="status">
                            <option value="Single">Single</option>
                            <option value="In an open relationship">In an open relationship</option>
                            <option value="It's Complicated">It's Complicated</option>
                       </select> */}
                       <br/>
                       <RaisedButton label="Continue" primary={true} style={styles.button} onClick={this.continue}/>
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

export default FormUserDetails
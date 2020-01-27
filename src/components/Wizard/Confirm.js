import React, { Component } from 'react';
import { observer, inject } from "mobx-react"
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import {List,ListItem} from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import { StylesProvider } from '@material-ui/core';
@inject("user", "usersStore", "locationsStore", "myProfile", "socketStore")
@observer

class Confirm extends Component{

    continue = async event => {
        event.preventDefault()
        this.props.nextStep()
        console.log(this.props.values)
        await axios.post(`http://localhost:8080/signIn`, this.props.values);

    }
        

    
    back = event => {
        event.preventDefault()
        this.props.previousStep()
   
    }
       
    

    render(){
        const { values:{firstName,lastName, age, email,  status, desiredRelationship, interstedIn , gender,  picture }} = this.props
        // console.log(this.props.values)
        return (
               <MuiThemeProvider>
                   <React.Fragment>
                       <AppBar title="Confirm user data" />
                        <List>
                          <ListItem primaryText= 'First Name' secondaryText={firstName}/>
                          <ListItem primaryText= 'Last Name' secondaryText={lastName}/>
                          <ListItem primaryText= 'Age' secondaryText={age}/>
                          <ListItem primaryText= 'Email' secondaryText={email}/>
                          <ListItem primaryText= 'Status' secondaryText={status}/>
                          <ListItem primaryText= 'Desired Relationship' secondaryText={desiredRelationship}/>
                          <ListItem primaryText= 'Intersted In' secondaryText={interstedIn}/>
                          <ListItem primaryText= 'Gender' secondaryText={gender}/>
                          <ListItem primaryText= 'Picture' secondaryText={picture}/>
                          
                      </List>
                       <br/>
                       <RaisedButton label="Confirm&Continue" primary={true} style={styles.button} onClick={this.continue}/>
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

export default Confirm
import React, { Component } from 'react';
import { observer, inject } from "mobx-react"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { StylesProvider, InputLabel } from '@material-ui/core';
import { MenuItem } from 'material-ui';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from "@material-ui/core/FormControl"
import FormLabel from "@material-ui/core/FormLabel"
@inject("user", "usersStore", "locationsStore", "myProfile", "socketStore")
@observer

class FormPersonalDetails extends Component {
    state = {
        Men: false,
        Women: false
    }

    continue = event => {
        event.preventDefault()
        this.props.nextStep()

    }

    back = event => {
        event.preventDefault()
        this.props.previousStep()

    }

    render() {
        const { values, handleChange } = this.props
        return (
            <MuiThemeProvider>
                <React.Fragment>
                    <AppBar title="Enter User Details" />

                    <InputLabel id="desired-relationship-label">What Are You Looking For?</InputLabel>
                    <Select labelId="desired-relationship-label" label="What Are You Looking For?"
                        hintText="Enter Your Desdired Relationship"
                        floatingLabelText="desiredRelationship"
                        onChange={handleChange('desiredRelationship')}
                        value={values.desiredRelationship} autoWidth>
                        <MenuItem value="True Love">True Love</MenuItem>
                        <MenuItem value="Hookups">Hookups</MenuItem>
                    </Select>
                    <br />

                    <FormControl component="fieldset" >
                        <FormLabel component="legend">Assign responsibility</FormLabel>
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox onChange={handleChange('interestedIn')} value="Men" />}
                                label="Men"
                            />
                            <FormControlLabel
                                control={<Checkbox onChange={handleChange('interestedIn')} value="Women" />}
                                label="Women"
                            />
                        </FormGroup>

                    </FormControl>
                    {/* <TextField
                        hintText="Enter Your Interested In"
                        floatingLabelText="Interested In"
                        onChange={handleChange('interedtedIn')}
                        defaultValue={values.interedtedIn}
                    /> */}
                    <br />
                    <TextField
                        hintText="Enter Your Gender"
                        floatingLabelText="Gender"
                        onChange={handleChange('gender')}
                        defaultValue={values.gender}
                    />
                    <br />
                    <TextField
                        hintText="Enter Your Picture"
                        floatingLabelText="Picture"
                        onChange={handleChange('picture')}
                        defaultValue={values.picture}
                    />
                    <br />
                    <RaisedButton label="Continue" primary={true} style={styles.button} onClick={this.continue} />
                    <RaisedButton label="Back" primary={false} style={styles.button} onClick={this.back} />
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
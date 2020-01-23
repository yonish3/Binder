import React, { Component } from 'react';
import { observer, inject } from "mobx-react"
import FormUserDetails from './FormUserDetails';
import FormPersonalDetails from "./FormPersonalDetails"
import Confirm from "./Confirm"
import Sucess from "./Success"

@inject("user", "usersStore", "locationsStore", "myProfile", "socketStore")
@observer

class UserForm extends Component {
    state = {
        step: 1,
        firstName: '',
        lastName: '',
        age: Number,
        status: '',
        desiredRelationship: '',
        interedtedIn: '',
        gender: '',
        picture: ''
    }

    nextStep = () => {
        const { step } = this.state
        this.setState({
            step: step + 1
        })
    }

    previousStep = () => {
        const { step } = this.state
        this.setState({
            step: step - 1
        })
    }

    handleChange = (input) => (event) => {
        this.setState({
            [input]: event.target.value
        })
    }

    render() {
        const { step } = this.state
        const { firstName, lastName, age, status, desiredRelationship, interedtedIn, gender, picture } = this.state
        const values = { firstName, lastName, age, status, desiredRelationship, interedtedIn, gender, picture }

        switch (step) {
            case 1:
                return (
                    <FormUserDetails nextStep={this.nextStep} handleChange={this.handleChange} values={values} />
                )
            case 2:
                return (
                <FormPersonalDetails nextStep={this.nextStep} previousStep={this.previousStep} handleChange={this.handleChange} values={values}/>
                )
            case 3:
                return (
                    <Confirm nextStep={this.nextStep} previousStep={this.previousStep}  values={values}/>
                    )
            case 4:
                return <Sucess/>
        }
    }
}

export default UserForm
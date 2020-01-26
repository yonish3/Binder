import React, { Component } from 'react';
import { observer, inject } from "mobx-react"
import FormUserDetails from './FormUserDetails';
import FormPersonalDetails from "./FormPersonalDetails"
import Confirm from "./Confirm"
import Sucess from "./Success"
import axios from "axios"

@inject("user", "usersStore", "locationsStore", "myProfile", "socketStore")
@observer

class UserForm extends Component {
    constructor() {
        super()
        this.state = {
            step: 1,
            firstName: '',
            lastName: '',
            age: Number,
            status: '',
            desiredRelationship: '',
            interestedIn: [],
            gender: '',
            picture: null
        }
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
        
        console.log(input, event)
        if (input === "age" && event.target.value > 100){
            alert("Age must be between 18 to 100!")
            event.target.value = 18
        } 
        if (input === "interestedIn" && event.target.checked === true) {
            const genderImInterestedIn = event.target.value
            let interestedInArray = [...this.state.interestedIn]
            interestedInArray.push(genderImInterestedIn)
            this.setState({
                interestedIn: interestedInArray
            })
            return
        } else if (input === "interestedIn" && event.target.checked === false){
            let interestedInArray = [...this.state.interestedIn]
            let genderToSplice = interestedInArray.indexOf(event.target.value)
            interestedInArray.splice(genderToSplice, 1)
            this.setState({
                interestedIn: interestedInArray
            })
            return
        }
        if (input === "picture"){
            this.setState({
                picture: event.target.files[0]
            }, function(){console.log(this.state)})
            return
        }
        this.setState({
            [input]: event.target.value
        })
    }

    upload = () => {
        const reader = new FileReader()
        reader.readAsDataURL(this.state.picture)
        reader.onload = async (event) => {
            // console.warn("img data", event.target.result)
            // const url = "http://localhost:3000/image"
            const formData = {file:event.target.result}
            const imagePost = await axios.post("http://localhost:8080/image", formData)
            console.log(imagePost)
            // return axios.post(url, formData).then(response => console.warn("response", response))
        }
        // formdata.append('image', this.state.picture, this.state.picture.name)
        console.log(this.state)
        console.log(reader)
    }

    render() {
        
        const { step } = this.state
        const { firstName, lastName, age, status, desiredRelationship, interestedIn, gender, picture } = this.state
        const values = { firstName, lastName, age, status, desiredRelationship, interestedIn, gender, picture }

        switch (step) {
            case 1:
                return (
                    <FormUserDetails nextStep={this.nextStep} handleChange={this.handleChange} values={values} />
                )
            case 2:
                return (
                <FormPersonalDetails nextStep={this.nextStep} previousStep={this.previousStep} handleChange={this.handleChange} upload={this.upload} values={values}/>
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
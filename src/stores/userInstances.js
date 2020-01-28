import {observable, action} from "mobx"

export class User{
    @observable id
    @observable firstName
    @observable lastName
    @observable age
    @observable email
    @observable password
    @observable status
    @observable desiredRelationship
    @observable interestedIn
    @observable gender
    @observable picture
    
    
    @observable isCheckedIn
    @observable isLoggedIn = false
    @observable isDeleted 
    
    constructor(id, firstName, lastName, age, email, password, status, desiredRelationship, interestedIn, gender, picture, coordinates){
        this._id = id
        this.firstName = firstName
        this.lastName = lastName
        this.age = age
        this.email = email
        this.password = password
        this.status = status
        this.desiredRelationship = desiredRelationship
        this.interestedIn = interestedIn
        this.gender = gender
        this.picture = picture
    }

    @action logIn = () => {
        return this.isLoggedIn = true
    }
}
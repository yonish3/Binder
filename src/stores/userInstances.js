import {observable} from "mobx"

export class User{
    @observable id
    @observable firstName
    @observable lastName
    @observable age
    @observable status
    @observable desiredRelationship
    @observable interestedIn
    @observable gender
    @observable picture
    
    
    @observable isCheckedIn
    @observable isDeleted 
    
    constructor(id, firstName, lastName, age, status, desiredRelationship, interestedIn, gender, picture, coordinates){
        this._id = id
        this.firstName = firstName
        this.lastName = lastName
        this.age = age
        this.status = status
        this.desiredRelationship = desiredRelationship
        this.interestedIn = interestedIn
        this.gender = gender
        this.picture = picture
    }
}
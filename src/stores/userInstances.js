import { observable, computed, action } from "mobx"
import axios from "axios"

export class User{
    @observable id
    @observable firstName = 'first name'
    @observable lastName
    @observable age
    @observable status
    @observable desiredRelationship
    @observable interestedIn
    @observable gender
    @observable picture 
    
    
    @observable isCheckedIn
    @observable isDeleted 
    

    @action logIn = async (username) =>{
        const userInfo = await axios.get(`http://localhost:8080/login/${username}`)
        console.log('user name from server: ' + userInfo.data )
        this.firstName = userInfo.data
    }
}
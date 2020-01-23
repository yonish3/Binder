import { observable, computed, action } from "mobx"
import { inject } from "mobx-react"
// import { User } from "./userInstances"
// import axios from "axios"
const dummyData = require("./dummyData")



export class UsersStore{
    @observable users = []
    
    @action getUsers = () => {
        console.log(this.props)
        this.users = dummyData.default
    }

    @action getUserById = (userId) => {
        const user = this.users.find(user => user._id == userId)
        return user;
    }
}



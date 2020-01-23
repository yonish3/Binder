import { observable, computed, action } from "mobx"
// import { User } from "./userInstances"
// import axios from "axios"
const dummyData = require("./dummyData")


export class UsersStore{
    @observable users = []

    @action getUsers = () => {
        this.users = dummyData.default
    }

    @action getUserById = (userId) => {
        const user = this.users.find(user => user.id == userId)
        return user;
    }
}



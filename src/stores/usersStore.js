import { observable, computed, action } from "mobx"
import { User } from "./userInstances"
import axios from "axios"
const dummyData = require("./dummyData")


export class UsersStore{
    @observable users = []

    @action getUsers = () => {
        this.users = dummyData.default
    }
}



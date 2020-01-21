import { observable, computed, action } from "mobx"
import { User } from "./userInstances"
import axios from "axios"

export class UsersStore{
    @observable users = []
}



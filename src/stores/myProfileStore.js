import {observable} from "mobx"
import dummyData from "./dummyData"

export class MyProfile{
    @observable profile = {}

    @action getProfile = () => {
        this.profile = dummyData[0]
        console.log(this.profile)
    }
}
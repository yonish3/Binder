import { observable, action } from "mobx"
import dummyData from "./dummyData"

export class MyProfile{
    @observable profile = {}

    @action getProfile = () => {
        this.profile = dummyData[3]
        
    }
}
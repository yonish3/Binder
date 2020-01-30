import { observable, action } from  'mobx'

export class GeneralStore {
    @observable headerLabel = "Binder"
    @observable displayMenu = false

    @action setHeaderLabel = (newLabel) => {
        this.headerLabel = newLabel
    } 
}

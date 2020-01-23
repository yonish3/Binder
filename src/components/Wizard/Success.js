import React, { Component } from 'react';
import { observer, inject } from "mobx-react"


@inject("user", "usersStore", "locationsStore", "myProfile", "socketStore")
@observer

class Success extends Component{
    constructor(){
        super();
        this.state = {
        }
    }

    render(){
        return (
               <> 
               </> 
        )
    }
}

export default Success
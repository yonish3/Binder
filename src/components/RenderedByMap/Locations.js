import React, { Component } from 'react';
import { observer, inject } from "mobx-react"
import Users from "./Users"

@inject("user", "usersStore")
@observer

class Locations extends Component{

    render(){
        return (
               <> 
                
               </> 
        )
    }
}

export default Locations
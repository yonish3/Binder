import React, { Component } from 'react';
import { observer, inject } from "mobx-react"
@inject("user", "usersStore", "locationsStore", "myProfile", "socketStore")
@observer


class FadingNotification extends Component{


    render(){
        return (
               <> 
               </> 
        )
    }
}

export default FadingNotification
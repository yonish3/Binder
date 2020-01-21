import React, { Component } from 'react';
import { observer, inject } from "mobx-react"

@inject("user", "usersStore")
@observer


class User extends Component{


    render(){
        console.log(this.props.dummyUser)
        return (
               <> 
               </> 
        )
    }
}

export default User
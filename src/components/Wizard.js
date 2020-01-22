import React, { Component } from 'react';
import { observer, inject } from "mobx-react"
@inject("user", "usersStore")
@observer

class Wizard extends Component{


    render(){
        return (
            <>
            </>
        )
    }
}

export default Wizard
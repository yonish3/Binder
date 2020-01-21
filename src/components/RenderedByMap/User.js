import React, { Component } from 'react';
import { observer, inject } from "mobx-react"
import { Link } from "react-router-dom"
@inject("user", "usersStore")
@observer


class User extends Component{


    render(){
        const locationIamIn = this.props.match.params.location
        return (
               <> 
               <Link to={`/map/${locationIamIn}`}>Back</Link>
               <div>
                Chat with me!
                </div>
               </> 
        )
    }
}

export default User
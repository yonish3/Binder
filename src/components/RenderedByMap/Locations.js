import React, { Component } from 'react';
import { observer, inject } from "mobx-react"
import { Link } from "react-router-dom"
import User from "./User"
import { BrowserRouter } from 'react-router-dom';

@inject("user", "usersStore")
@observer

class Locations extends Component {

    // pushToArray = (array) => {
    //     let newUsersArray = []
    //     array.forEach(user => newUsersArray.push(user))
    //     // console.log(newUsersArray)
    //     return newUsersArray
    // }

    render() {
        const thisDummyUsers = this.props.usersStore.users
        // const dummyUsersJS = thisDummyUsers ? this.pushToArray(thisDummyUsers) : null
        return (
            <>
                {thisDummyUsers.map((user, index) =>
                    <div key={index}>
                        <h2>{user.firstName}</h2>
                        <h4>{user.age}</h4>
                        <h5>{user.gender}</h5>
                        <h5>{user.status}</h5>
                        <h5>{user.desiredRelationship}</h5>
                        <img src={user.picture} />
                    </div>
                )}
            </>
        )
    }
}

export default Locations
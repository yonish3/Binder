import React, { Component } from 'react';
import { observer, inject } from "mobx-react"
import { Link } from "react-router-dom"


@inject("user", "usersStore")
@observer

class Locations extends Component {


    render() {
        const thisDummyUsers = this.props.usersStore.users
        const currentLocation = this.props.match.params.location
        // send yoni the location and then load a loading bar and when the loading finishes - rendering the users
        return (
            <>
                {thisDummyUsers.map((user, index) =>
                    <Link to={`/user/${currentLocation}/${user.firstName}`} key={index}>
                        <div key={index}>
                            <h2>{user.firstName}</h2>
                            <h4>{user.age}</h4>
                            <h5>{user.gender}</h5>
                            <h5>{user.status}</h5>
                            <h5>{user.desiredRelationship}</h5>
                            <img src={user.picture} />
                        </div>
                    </Link>
                )}
            </>
        )
    }
}

export default Locations
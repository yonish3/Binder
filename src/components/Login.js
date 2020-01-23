import React, { Component } from 'react';
import { observer, inject } from "mobx-react";

@inject("user", "usersStore", "locationsStore", "myProfile", "socketStore")
@observer
class Login extends Component {

    componentDidMount = () => {
        this.props.user.logIn('Yoni')
    }

    render() {
        return (
            <div>
                Log In
                <div>{this.props.user.firstName}</div>
            </div>
        );
    }
}

export default Login;
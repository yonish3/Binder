import React, { Component } from 'react';
import { observer, inject } from "mobx-react"
import BottomNavigation from '@material-ui/core/BottomNavigation'
import { Route, Link } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";


@inject("user", "usersStore", "locationsStore", "myProfile", "socketStore")
@observer


class Footer extends Component {

    checkout = () => {
       this.props.user.checkout()
    }

    render() {

        return (
            <BottomNavigation value="Checkout" className={useStyles.root}>
                <Link to="/" className="link">
                <AppBar position="static" style={useStyles.appBarStyle} onClick={this.checkout}>
                    <Toolbar>
                        <Typography variant="h6" className={useStyles.title}>
                            Checkout
                        </Typography>
                    </Toolbar>
                </AppBar>
                </Link>
            </BottomNavigation>
        )
    }
}

const useStyles = makeStyles({
    appBarStyle: {
        backgroundColor: "#e91e63"
    },
    root: {
        flexGrow: 1
    },
    title: {
        flexGrow: 1
    },
    list: {
        width: 250
    },
    fullList: {
        width: "auto"
    }
});

export default Footer
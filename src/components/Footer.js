import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import { Route, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import {withRouter} from 'react-router-dom';
@inject("user", "usersStore", "locationsStore", "myProfile", "socketStore")
@observer
class Footer extends Component {
  constructor() {
    super();
    this.state = {
      value: 0
    };
  }

  useStyles = () => {
    return makeStyles({
      root: {
        width: 500
      }
    });
  };

  checkout = () => {
    this.props.user.checkout();
    this.props.socketStore.checkoutFromLocation();
    this.props.history.push('/')
  };

  render() {
    const classes = this.useStyles();
    return (
      <BottomNavigation
        value={this.state.value}
        onChange={(event, newValue) => {
          this.setState({ value: newValue });
          //   setValue(newValue);
        }}
        showLabels
        className={classes.root}
      >
       
          <BottomNavigationAction onClick={this.checkout} label="Leave"  style={{color: "black"}} icon={<ExitToAppIcon />} />
       
      </BottomNavigation>
    );
  }
}

// const useStyles = makeStyles({
//     root: {
//         width: 500,
//       },
// });

export default withRouter(Footer)

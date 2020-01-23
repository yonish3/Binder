import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import Paper from "@material-ui/core/Paper";
import Zoom from "@material-ui/core/Zoom";
import { makeStyles } from "@material-ui/core/styles";

import Emojify from "react-emojione";
@inject("user", "usersStore", "locationsStore", "myProfile", "socketStore")
@observer
class Notification extends Component {
  useStyles = () => {
    return makeStyles(theme => ({
      root: {
        height: "100vh"
      },
      container: {
        display: "flex"
      },
      paper: {
        margin: theme.spacing(1)
      },
      svg: {
        width: 100,
        height: 100
      },
      polygon: {
        fill: theme.palette.common.white,
        stroke: theme.palette.divider,
        strokeWidth: 1
      }
    }));
  };
  render() {
    const classes = this.useStyles();
    console.log(`in notification, reactingUser is `, this.props.socketStore.reactingUser);
    
    return (
      <div>
        {/* <Zoom
          in={this.props.socketStore.checked}
          style={{
            transitionDelay: this.props.socketStore.checked ? "500ms" : "0ms"
          }}
        > */}
          
            <Emojify
              style={{ height: 80, width: 80, marginLeft: "40%", marginTop: "70%" }}
            >
              {this.props.socketStore.emoji}
            </Emojify>
            <div style={{textAlign: "center"}}>
                {this.props.socketStore.reactingUser.firstName} has reacted to you!
            </div> 
        {/* </Zoom> */}
      </div>
    );
  }
}

export default Notification;

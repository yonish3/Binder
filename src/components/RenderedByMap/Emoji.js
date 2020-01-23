import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import Emojify from "react-emojione"
import Tooltip from "@material-ui/core/Tooltip";
import Fade from "@material-ui/core/Fade";
@inject("user", "usersStore", "locationsStore", "myProfile", "socketStore")
@observer

class Emoji extends Component {
  handleClick = label => {
    const userId = this.props.match.params.id;
    const user = this.props.socketStore.getUserById(userId);
// console.log('userId is ', userId);

    const reactionObj = {
      label,
      destinationUser: user
    };

    console.log("socket is ", this.props.socketStore.socket);
    console.log('reactionObj is ', reactionObj);
    
    this.props.socketStore.sendReaction(reactionObj);
  };

 
  render() {
    const userId = this.props.match.params.userId;
    const user = this.props.usersStore.getUserById(userId);

    this.props.socketStore.socket.on("reaction recieved", reactionObj => {
      console.log("Recieved an Emoji!");
    });

    return (
      //   <span
      //     className="emoji"
      //     role="img"
      //     aria-label={this.props.label ? this.props.label : ""}
      //     aria-hidden={this.props.label ? "false" : "true"}
      //   >
      //     {this.props.symbol}
      //   </span>

      //       <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="Add">
      //   <Emojify style={{ height: 32, width: 32 }}>:heart:</Emojify>
      //     </Tooltip>
      <>
        <Emojify
          style={{ height: 32, width: 32 }}
          onClick={() => this.handleClick(":heart:")}
        >
          :heart:
        </Emojify>
        <Emojify
          style={{ height: 32, width: 32 }}
          onClick={() => this.handleClick(":fire:")}
        >
          :fire:
        </Emojify>
        <Emojify
          style={{ height: 32, width: 32 }}
          onClick={() => this.handleClick(":heart_eyes:")}
        >
          :heart_eyes:
        </Emojify>
        <Emojify
          style={{ height: 32, width: 32 }}
          onClick={() => this.handleClick(":blush:")}
        >
          :blush:
        </Emojify>
        <Emojify
          style={{ height: 32, width: 32 }}
          onClick={() => this.handleClick(":(")}
        >
          :(
        </Emojify>
      </>
    );
  }
}

export default Emoji;

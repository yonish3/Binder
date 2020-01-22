import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import Emojify from "react-emojione";
import Tooltip from "@material-ui/core/Tooltip";
import Fade from "@material-ui/core/Fade";
@inject("user", "usersStore", "locationsStore", "myProfile", "socketStore")
@observer
class Emoji extends Component {
  render() {
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
        <Emojify style={{ height: 32, width: 32 }} onClick={() => console.log("!!!")}>:heart:</Emojify>
        <Emojify style={{ height: 32, width: 32 }} onClick={() => console.log("!!!")}>:fire:</Emojify>
        <Emojify style={{ height: 32, width: 32 }} onClick={() => console.log("!!!")}>:heart_eyes:</Emojify>
        <Emojify style={{ height: 32, width: 32 }} onClick={() => console.log("!!!")}>:blush:</Emojify>
        <Emojify style={{ height: 32, width: 32 }} onClick={() => console.log("!!!")}>:(</Emojify>
      </>
    );
  }
}

export default Emoji;

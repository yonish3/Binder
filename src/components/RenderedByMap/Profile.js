import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import Typography from "@material-ui/core/Typography";
import Emoji from "./Emoji";
import Paper from '@material-ui/core/Paper';
import Zoom from '@material-ui/core/Zoom';
import DorImage from "../../dummyImage/DorBenLulu.jpg";
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import InfoIcon from '@material-ui/icons/Info';
// import Emojify from "react-emojione";
// const Emoji = Emojify
import { makeStyles } from '@material-ui/core/styles';
@inject("user", "usersStore", "locationsStore", "myProfile", "socketStore")
@observer
class Profile extends Component {

  
  render() {
    console.log(this.props.match)
    console.log(this.props.socketStore.nearbyUsers)
    
    const userId = this.props.match.params.id;
    console.log(`user id `, userId);
    const user = this.props.socketStore.getUserById(userId)
    console.log(`user to display is `, user);

    const containerStyle = {
      position: "relative",
      overflow: "hidden",
      height: "40vh",
      width: "100vw",
      backgroundImage: `url(${user.picture})`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat"
    };

    const imageStyle = {
      maxWidth: "100%",
      maxHeight: "100%",
      position: "absolute",
      top: "0",
      bottom: "0",
      margin: "auto",
      width: "100%"
    };

    const iconStyle = {
      verticalAlign: "-10%",
      color:"#040404d9"
    }

    const userInfoStyle = {
      textIndent: "5vw"
    }

    const headlineStyle = {
      color: "#6d6b6b"
    }
    return (
      <div>
        <div style={containerStyle}></div>
        <div style={userInfoStyle}>
        <Typography variant="h6" gutterBottom>
         {user.firstName}, {user.age}
        </Typography>
        <Typography variant="subtitle2" style={headlineStyle} gutterBottom>
        <PermIdentityIcon style={iconStyle} /> {user.status}
        </Typography>
        <Typography variant="subtitle2" style={headlineStyle} gutterBottom>
          <InfoIcon style={iconStyle} /> Looking for: {user.desiredRelationship}
        </Typography>
        <Emoji match={this.props.match}/>
        </div>

      </div>
    );
  }
}
export default Profile;

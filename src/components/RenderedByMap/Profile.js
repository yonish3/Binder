import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import Typography from "@material-ui/core/Typography";
import Emoji from "./Emoji";
import Paper from '@material-ui/core/Paper';
import Zoom from '@material-ui/core/Zoom';
import DorImage from "../../dummyImage/DorBenLulu.jpg";
// import Emojify from "react-emojione";
// const Emoji = Emojify
import { makeStyles } from '@material-ui/core/styles';
@inject("user", "usersStore", "locationsStore", "myProfile", "socketStore")
@observer
class Profile extends Component {

  
  render() {
    console.log(this.props.match)
    console.log(this.props.usersStore.users)
    // const user = {
    //   firstName: "Dor",
    //   lastName: "Ben Lulu",
    //   age: 25,
    //   status: "Single",
    //   desiredRelationship: "Serious Relationship",
    //   interestedIn: ["Women"],
    //   gender: "Male",
    //   picture: DorImage,
    //   isCheckedIn: true,
    //   isDeleted: false
    // };
    
    const userId = this.props.match.params.id;
    console.log(`user id `, userId);
    const user = this.props.socketStore.getUserById(userId)

    console.log(`user to display is `, user);
console.log(this.props.usersStore.users);

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

    
    return (
      <div>
        <div style={containerStyle}></div>
        <Typography variant="h6" gutterBottom>
          {user.firstName}, {user.age}
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          {user.status}
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          Looking for: {user.desiredRelationship}
        </Typography>
        <Emoji match={this.props.match}/>


      </div>
    );
  }
}
export default Profile;

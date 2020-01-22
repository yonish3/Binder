import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import Typography from "@material-ui/core/Typography";
import Emoji from "./Emoji";
import DorImage from "../../dummyImage/DorBenLulu.jpg";
// import Emojify from "react-emojione";
// const Emoji = Emojify

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
    const user = this.props.usersStore.getUserById(userId)

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

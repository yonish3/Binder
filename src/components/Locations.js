import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import image from "../dummyImage/dummyMap.PNG";
import { Link } from "react-router-dom";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";



@inject("user", "usersStore", "locationsStore", "myProfile", "socketStore")
@observer

class Locations extends Component {
  useStyles = () => {
    return makeStyles(theme => ({
      root: {
        width: "100%",
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper
      }
    }));
  };
  sendLocation = (location) => {
    this.props.user.checkin()
    this.props.socketStore.SelectedLocationCoordinates = location.locationCoordinates
    this.props.socketStore.watchPosition()
    this.props.socketStore.getUsersNearMe(location.name)
  }

  render() {
    // const realLocationArray = this.props.locationsStore.locations
    // function that gets locations from yoni
    const locationsArray = this.props.socketStore.nearbyLocations;

    const divStyle = {
      position: "absolute",
      top: "47%",
      width: "100%",
      backgroundColor: "#ece9e95e"
    };

    const classes = this.useStyles();
    return (

      <List
        component="nav"
        className={classes.root}
        aria-label="mailbox folders"
        style={divStyle}
      >
        {locationsArray.map((location, i) => (
          <ListItem key={i} button value={location} onClick={() => this.sendLocation(location)}>
            <Link to={`/map/${location.name}`} >
              <ListItemText primary={location.name} />
            </Link>
          </ListItem>
        ))}
      </List>


    );
  }
}

export default Locations;

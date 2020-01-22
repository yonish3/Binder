import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { Link } from "react-router-dom";
import User from "./User";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
// import tileData from "./tileData";

@inject("user", "usersStore")
@observer
class Users extends Component {
  useStyles = () => {
    return makeStyles(theme => ({
      root: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        overflow: "hidden",
        backgroundColor: theme.palette.background.paper
      },
      gridList: {
        width: 500,
        height: 450
      },
      icon: {
        color: "rgba(255, 255, 255, 0.54)"
      }
    }));
  };

  render() {
    const thisDummyUsers = this.props.usersStore.users;
    const currentLocation = this.props.match.params.location;
    const classes = this.useStyles();
    // send yoni the location and then load a loading bar and when the loading finishes - rendering the users
    return (
      <>
        {/* {thisDummyUsers.map((user, index) => (
          <Link to={`/user/${currentLocation}/${user.firstName}`} key={index}>
            <User user={user} />
          </Link>
        ))} */}
        {/* <div className={classes.root}>



        <GridList cellHeight={180} className={classes.gridList}>
          <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
            <ListSubheader component="div">Elevation</ListSubheader>
          </GridListTile>
          {thisDummyUsers.map((user, index) => (
            <Link to={`/user/${currentLocation}/${user.firstName}`} key={index}>
              <GridListTile key={user.img} cols={2} style={{ maxHeight: "100%" }} >
                <img src={user.picture} alt={user.firstName} style={{maxWidth: "100%", maxHeight: "100%"}} />
                <GridListTileBar
                  title={user.firstName}
                  subtitle={
                    <span>
                      {user.firstName} {user.lastName}
                    </span>
                  }
                />
              </GridListTile>
            </Link>
          ))}
        </GridList>
        </div> */}

        <div className={classes.root}>
          <GridList cellHeight={180} className={classes.gridList}>
            <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
              <ListSubheader component="span">December</ListSubheader>
              <ListSubheader component="span"><Link to="/">Back</Link></ListSubheader>
            </GridListTile>
            {thisDummyUsers.map(user => (
              <GridListTile key={user.firstName}>
                <img src={user.picture} alt={user.firstName} />
                <GridListTileBar
                  title={user.firstName}
                  subtitle={<span>by: {user.firstName}</span>}
                  actionIcon={
                    <IconButton
                      aria-label={`info about ${user.firstName}`}
                      className={classes.icon}
                    >
                      <InfoIcon />
                    </IconButton>
                  }
                />
              </GridListTile>
            ))}
          </GridList>
        </div>
      </>
    );
  }
}
// {thisDummyUsers.map((user, index) =>
//     <Link to={`/user/${currentLocation}/${user.firstName}`} key={index}>
//         <div key={index}>
//             <h2>{user.firstName}</h2>
//             <h4>{user.age}</h4>
//             <h5>{user.gender}</h5>
//             <h5>{user.status}</h5>
//             <h5>{user.desiredRelationship}</h5>
//             <img src={user.picture} />
//         </div>
//     </Link>
// )}
export default Users;

import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";

@inject("user", "usersStore")
@observer
class User extends Component {
  useStyles = () => {
    return makeStyles({
      icon: {
        color: "rgba(255, 255, 255, 0.54)"
      }
    });
  };

  render() {
    // const locationIamIn = this.props.match.params.location;

    // const useStyles = makeStyles({
    //   card: {
    //     maxWidth: 345,
    //   },
    // });

    const classes = this.useStyles();
    const user = this.props.user;

    const contentStyle = {
      opacity: "0.5"
    };

    const imageStyle = {
      height: "40vh"
    };

    return (
      <GridListTile>
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
    );
  }
}

//   <Card className={classes.card}>
//     <CardActionArea>
//       <CardMedia
//         component="img"
//         alt="Contemplative Reptile"
//         style={imageStyle}
//         image={user.picture}
//         title="Contemplative Reptile"
//       />
//       <CardContent style={contentStyle}>
//         <Typography gutterBottom variant="h5" component="h2">
//           {user.firstName} {user.lastName}
//         </Typography>
//         <Typography variant="body2" color="textSecondary" component="p" >
//             Status: {user.status}

//         </Typography>
//         <Typography variant="body2" color="textSecondary" component="p" >
//              Looking for: {user.desiredRelationship}
//         </Typography>
//       </CardContent>
//     </CardActionArea>
//   </Card>
export default User;

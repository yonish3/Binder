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

@inject("user", "usersStore", "locationsStore", "myProfile", "socketStore")
@observer
class User extends Component {
  useStyles = () => {
    return makeStyles({
      card: {
        maxWidth: 345
      }
    });
  }



  render() {


    const classes = this.useStyles();
    const user = this.props.user

    const contentStyle= {
        opacity: "0.5"
    }

    const imageStyle = {
        height: "40vh"
    }

    return (
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            style={imageStyle}
            image={user.picture}
            title="Contemplative Reptile"
          />
          <CardContent style={contentStyle}>
            <Typography gutterBottom variant="h5" component="h2">
              {user.firstName} {user.lastName}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" >
                Status: {user.status}
                
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" >
                 Looking for: {user.desiredRelationship}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }
}

export default User;

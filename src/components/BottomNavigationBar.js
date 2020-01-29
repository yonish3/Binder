import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Link } from "react-router-dom"
class BottomNavigationBar extends Component {

    constructor() {
        super()
        this.state = {
            value:0
        }
    }
    useStyles = () => {
        return makeStyles({
        root: {
          position: "absolute",
          bottom: "0",
          width: "500vw",
        },
      })}

    render() {
        const classes = this.useStyles();

        const barStyle = {
          position: "absolute",
          bottom: "0%",
          width: "100%",
        }
        return (
            <BottomNavigation
              value={this.state.value}
              onChange={(event, newValue) => {
                  this.setState({value: newValue})
                // setValue(newValue);
              }}
              showLabels
              className={classes.root}
              style={barStyle}
            >
              <Link to='/'><BottomNavigationAction label="Leave" icon={<ExitToAppIcon />} /></Link>
              {/* <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
              <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} /> */}
            </BottomNavigation>
          );
    }
}

export default BottomNavigationBar;
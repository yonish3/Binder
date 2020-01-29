import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import EmptyProfilePicture from "../dummyImage/Empty.jpg";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import SettingsIcon from "@material-ui/icons/Settings";
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from "@material-ui/icons/Notifications";
import Tap from "./Tap";
import { inject } from "mobx-react";

@inject("socketStore")

class Header extends Component {
  
  constructor(){
    super()
    this.state = {
      left: false
    }
  }

  toggleDrawer = (side, open) => event => {
    console.log("event type is ", event.type);
    console.log("open is ", open);

    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    this.setState({
      left: open
    })
  };

  initializeCounter = () => {
    this.props.socketStore.readNotifications()
  }

  sideList = side => {
  const classes = this.useStyles();
  return(
    <div
      className={classes.list}
      role="presentation"
      onClick={this.toggleDrawer(side, false)}
      onKeyDown={this.toggleDrawer(side, false)}
    >
      <List>
        <ListItem
          button
          onClick={() => {
            console.log("Want to close!");
            this.toggleDrawer(side, false);
          }}
        >
          <ListItemIcon>
            <ArrowBackIosIcon />
          </ListItemIcon>
          <ListItemText primary="Back" />
        </ListItem>
        <ListItem>
          <img
            src={EmptyProfilePicture}
            style={{ width: "30vw", height: "30vw", paddingLeft: "13vw" }}
          />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <PermIdentityIcon />
          </ListItemIcon>
          <Link to="/editProfile"><ListItemText primary={"Edit Profile"} /></Link>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <Link to="/settings"><ListItemText primary={"Settings"} /></Link>
        </ListItem>
        <ListItem button onClick={this.initializeCounter}>
          <ListItemIcon>
            {
              this.props.socketStore.notificationsAmt > 0
                ? <Badge badgeContent={this.props.socketStore.notifications.length} color="primary"> <NotificationsIcon />
                  </Badge>
                : <Badge badgeContent={0} color="primary"> <NotificationsIcon />
                </Badge>
            }
          </ListItemIcon>
          <Link to="/notifications"> <ListItemText primary={'Notifications'} /> </Link>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <Link to="/"><ListItemText primary={"Back"} /></Link>
        </ListItem>
      </List>
      <Divider />
    </div>
  )}

  useStyles = () => {
    return makeStyles(theme => ({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1
    },
    list: {
      width: 250
    },
    fullList: {
      width: "auto"
    }
  }))}
  

  render() {
    const classes = this.useStyles();
    // const [left, setLeft] = React.useState(false);
    const appBarStyle = {
      backgroundColor: "#e91e63"
    };


  return (
    <div className={classes.root}>
      <AppBar position="static" style={appBarStyle}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon onClick={this.toggleDrawer("left", true)} />
            <Drawer open={this.state.left} onClose={this.toggleDrawer("left", false)}>
              {console.log("state.left is ", this.state.left)}
              {this.sideList("left")}
            </Drawer>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Binder
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}
}

export default Header

// const sideList = side => (
//     <div
//       className={classes.list}
//       role="presentation"
//       onClick={toggleDrawer(side, false)}
//       onKeyDown={toggleDrawer(side, false)}
//     >
//       <List>
//         <ListItem
//           button
//           onClick={() => {
//             console.log("Want to close!");
//             toggleDrawer(side, false);
//           }}
//         >
//           <ListItemIcon>
//             <ArrowBackIosIcon />
//           </ListItemIcon>
//           <ListItemText primary="Back" />
//         </ListItem>
//         {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
//           <ListItem button key={text}>
//             <ListItemIcon>
//               {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//             </ListItemIcon>
//             <ListItemText primary={text} />
//           </ListItem>
//         ))}
//       </List>
//       <Divider />
//       <List>
//         {["All mail", "Trash", "Spam"].map((text, index) => (
//           <ListItem button key={text}>
//             <ListItemIcon>
//               {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//             </ListItemIcon>
//             <ListItemText primary={text} />
//           </ListItem>
//         ))}
//       </List>
//     </div>
//   );

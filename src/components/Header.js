import React from "react";
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


const useStyles = makeStyles(theme => ({
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
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const [left, setLeft] = React.useState(false);

  const toggleDrawer = (side, open) => event => {
    console.log("event type is ", event.type);
    console.log("open is ", open);

    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      // setLeft(open);
      return;
    }

    setLeft(open);
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        <ListItem
          button
          onClick={() => {
            console.log("Want to close!");
            toggleDrawer(side, false);
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
        <ListItem button>
          <ListItemIcon>
            <Badge badgeContent={4} color="primary">
                <NotificationsIcon />
            </Badge>
          </ListItemIcon>
          <Link to="/notifications"><ListItemText primary={"Notifications"} /></Link>
        </ListItem>
      </List>
      <Divider />
    </div>
  );

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
            <MenuIcon onClick={toggleDrawer("left", true)} />
            <Drawer open={left} onClose={toggleDrawer("left", false)}>
              {console.log("state.left is ", left)}
              {sideList("left")}
            </Drawer>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Binder
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

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

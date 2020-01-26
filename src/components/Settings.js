import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import Paper from "@material-ui/core/Paper";
import Slide from "@material-ui/core/Slide";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

@inject("user", "usersStore", "locationsStore", "myProfile", "socketStore")
@observer
class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      checked: false
    };
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen =  () => {
     this.setState({ open: true });
  };

  useStyles = () =>
    makeStyles(theme => ({
      paper: {
        position: "absolute",
        width: "100%",
        height: "100vh",
        backgroundColor: "white",
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3)
      }
    }));

  handleSubmit = event => {
    event.preventDefault();
    console.log("email changeed");
    this.handleClose()
    // send a post reques to the server
  };

  openSlide =  (label) => {
    //  this.handleOpen()
    const slideStyle = {
        position: "absolute",
        width: "100%",
        height: "100vh",
        // backgroundColor: "white",
        // border: "2px solid #000",
        // boxShadow: theme.shadows[5],
        // padding: theme.spacing(2, 4, 3)
    }
    return (
        <Slide direction="left" in={this.state.open} mountOnEnter unmountOnExit >
        <Paper elevation={4} style={{slideStyle}} >
          <form onSubmit={this.handleSubmit} style={{verticalAlign: "middle"}}>
            <TextField id="standard-basic" label={label} style={{fontSize: "3vw"}}/>
            <Button type="submit" variant="contained" style={{height: "5vh", fontSize: "3vw"}} >Default</Button>
          </form>
        </Paper>
      </Slide>
    )
  }

  render() {
    const classes = this.useStyles();

    const modalStyle = {
      position: "relative",
      top: `20%`,
      left: `50%`,
      transform: `translate(-50%, -50%)`,
      backgroundColor: "white"
    };

    const slideStyle = {
        position: "absolute",
        width: "100%",
        height: "100vh",
        // backgroundColor: "white",
        // border: "2px solid #000",
        // boxShadow: theme.shadows[5],
        // padding: theme.spacing(2, 4, 3)
    }
    const divStyle = {
        position: "absolute",
        top: "47%",
        width: "100%",
        backgroundColor: "#ece9e95e"
      };
  

    return (
      <div>
        {/* <button type="button" onClick={this.handleOpen}>
          Open Modal
        </button> */}

        <List component="nav" className={classes.root} aria-label="mailbox folders" style={divStyle} >
        
          <ListItem button value={'Update Email'} onClick={this.handleOpen} style={{borderBottom:"1px solid #0000002e"}} >
              <ListItemText primary={'Update Email'} />
          </ListItem>
              {this.state.open ? this.openSlide('New email'): null}
        
      </List>
      {/* <Slide direction="left" in={this.state.open} mountOnEnter unmountOnExit >
        <Paper elevation={4} style={{slideStyle}} >
          <form onSubmit={this.handleSubmit} style={{verticalAlign: "middle"}}>
            <TextField id="standard-basic" label={"label"} style={{fontSize: "3vw"}}/>
            <Button type="submit" variant="contained" style={{height: "5vh", fontSize: "3vw"}} >Default</Button>
          </form>
        </Paper>
      </Slide> */}




      </div>
    );
  }
}

export default Settings;

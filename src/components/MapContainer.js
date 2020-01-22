import React, { Component } from 'react';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import { GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import { observer, inject } from 'mobx-react'
// import './App.css';
import CurrentLocation from "./CurrentLocation"

@inject("user", "usersStore")
@observer

class MapContainer extends Component {
  constructor() {
    super()
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    }
  }
  // state = {
  //   showingInfoWindow: false,
  //   activeMarker: {},
  //   selectedPlace: {}
  // };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });


  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };


  render() {
    //isloggiedIn? map component (axios post to yoni with id in the store) : wizard
    return (
        <div id="map-container">


          <CurrentLocation
            centerAroundCurrentLocation
            google={this.props.google}
          >
            <Marker onClick={this.onMarkerClick} name={'current location'} />
            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
              onClose={this.onClose}
            >
              <div>
                <h4>{this.state.selectedPlace.name}</h4>
              </div>
            </InfoWindow>
          </CurrentLocation>
        </div>
    );
  }
}


export default GoogleApiWrapper({
  apiKey: 'AIzaSyDmMp4vZyuGAkAHBsUj_cmiblYNk1POFXA'
})(MapContainer);

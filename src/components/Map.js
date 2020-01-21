import React, { Component } from 'react';

class Map extends Component {
    constructor(props){
        this.state={
            latitude:null,
            longitude:null,
            userAdress:null
        }
    }

     getLocation=()=> {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(this.getCordinate);
        } else {
          x.innerHTML = "Geolocation is not supported by this browser.";
        }
      }

      getCordinate=(position)=>{
        this.setState({
            latitude:  
        })
      }
    
    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default Map;
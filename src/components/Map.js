import React, { Component } from 'react';
import { observer, inject } from "mobx-react"
import image from "../dummyImage/dummyMap.PNG"
import { Link } from "react-router-dom"
import axios from "axios"

@inject("user", "usersStore", "locationsStore")
@observer

class MapDisplay extends Component {
    

    render() {
        // const realLocationArray = this.props.locationsStore.locations
        // function that gets locations from yoni
        const locationsArray = ["Speakeasy", "Camel-Comedy-Club", "Max-Brenner"]
        // sending location to yoni - post to yoni with axios 
        // getting from yoni users list //keeps updating
        

        return (
            <>
                <img src={image} alt="map" />

                {locationsArray.map((location, index) =>
                    <div key={index}>
                        <Link to={`/map/${location}`} className="link" key={index}>
                           {location}
                        </Link>
                    </div>

                )}
            {/* choose one place - button */}
            {/* send location to yoni */}
            </>
        )
    }
}

export default MapDisplay
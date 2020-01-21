import React, { Component } from 'react';
import { observer, inject } from "mobx-react"
import image from "../dummyImage/dummyMap.PNG"
import { Link } from "react-router-dom"
import Locations from "./RenderedByMap/Locations"

@inject("user", "usersStore")
@observer

class Map extends Component {


    render() {
        const locationsArray = ["Speakeasy", "Camel-Comedy-Club", "Max-Brenner"]


        return (
            <>
                <img src={image} alt="map" />

                {locationsArray.map((location, index) =>
                    <div key={index}>
                        {console.log(location)}
                        <Link to={`/map/${location}`} className="link" key={index}>
                           {location}
                        </Link>
                    </div>


                )}

            </>
        )
    }
}

export default Map
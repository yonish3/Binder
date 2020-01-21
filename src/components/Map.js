import React, { Component } from 'react';
import { observer, inject } from "mobx-react"
import image from "../dummyImage/dummyMap.PNG"
import { Link } from "react-router-dom"


@inject("user", "usersStore")
@observer

class MapDisplay extends Component {


    render() {
        // function that gets locations from yoni
        const locationsArray = ["Speakeasy", "Camel-Comedy-Club", "Max-Brenner"]
        // sending location to yoni
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

            </>
        )
    }
}

export default MapDisplay
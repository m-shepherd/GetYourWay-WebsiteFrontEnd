import { GoogleMap, useLoadScript, Marker, DirectionsRenderer, DirectionsService } from '@react-google-maps/api';
import React from 'react';
import { useState } from 'react';

const libraries=["places","directions","geocoder"]

const containerStyle = {
    width: '400px',
    height: '400px'
  };

export default function Map() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'AIzaSyCodtVa1E5fxA5mM3Pd-wiZoPH3uwyreMI',
        libraries
    });

    const [map,setMap] = useState(null);
    const [startMarkerPos,setStartMarkerPos] = useState({lat: 53.78986162692554, lng: -1.5330532190720971})
    const [endMarkerPos,setEndMarkerPos] = useState({lat: 53.78986162692554, lng: -1.5330532190720971})
    const [startMarkerVis,setStartMarkerVis] = useState(false)
    const [endMarkerVis,setEndMarkerVis] = useState(false)
    const [directions,setDirections] = useState(null)
    const [showDirections,setShowDirections] = useState(false)

    const onLoad = React.useCallback(function onLoad (mapInstance) {
        setMap(mapInstance)
        console.log(map)
    })

    const onMapClick = (e) => {
        console.log(e.latLng.toString())
        // if (startMarker.getVisible() == false){
            if (startMarkerVis === false){
                setStartMarkerPos(e.latLng)
                setStartMarkerVis(true)
            } else if (endMarkerVis === false){
                setEndMarkerPos(e.latLng)
                setEndMarkerVis(true)
            }
    }

    const onMarkerClick = (e) => {
        console.log(e)
    }

    const directionsCallback = (response) => {
        console.log(response)

        if (response !== null){
            if (response.status === 'OK') {
                if (startMarkerPos != null && endMarkerPos != null && directions === null)
                setDirections(response)
            }
        }
    }

    const getDirections = () => {
        setShowDirections(true)
    }


    if (!isLoaded) return <div>Loading...</div>

    return (
        <div>
            <GoogleMap
            zoom={16}
            center={{lat: 53.78986162692554, lng: -1.5330532190720971}}
            mapContainerStyle={containerStyle}
            onLoad = {onLoad}
            onClick = {onMapClick}>
                <Marker key='start' visible={startMarkerVis} onClick={onMarkerClick} position={startMarkerPos}/>
                <Marker key='end' visible={endMarkerVis} onClick={onMarkerClick} position={endMarkerPos}/>
                
                {showDirections === true && 
                <DirectionsService 
                options={{
                    origin : startMarkerPos,
                    destination : endMarkerPos,
                    travelMode : "DRIVING"
                }}
                callback = {directionsCallback}/>}

                {directions != null && 
                <DirectionsRenderer directions={directions} />}
            </GoogleMap>
            <button onClick={getDirections}>Get Directions</button>
        </div>
    )

}
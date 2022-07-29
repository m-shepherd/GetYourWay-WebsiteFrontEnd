import { GoogleMap, useLoadScript, Marker, DirectionsRenderer, DirectionsService, Autocomplete } from '@react-google-maps/api';
import React from 'react';
import { useState } from 'react';
import mapStyles from './Map.module.css';
import Geocode from 'react-geocode';


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

    Geocode.setApiKey('AIzaSyCodtVa1E5fxA5mM3Pd-wiZoPH3uwyreMI')

    const [centre, setcentre] = useState({lat: 53.78986162692554, lng: -1.5330532190720971});
    const [startMarkerPos,setStartMarkerPos] = useState(null);
    const [endMarkerPos,setEndMarkerPos] = useState(null);
    const [startMarkerVis,setStartMarkerVis] = useState(false);
    const [endMarkerVis,setEndMarkerVis] = useState(false);
    const [startMarkerAddress,setStartMarkerAddress] = useState('');
    const [endMarkerAddress,setEndMarkerAddress] = useState('');
    const [directions,setDirections] = useState(null);
    const [showDirections,setShowDirections] = useState(false);
    const [autocomplete,setAutocomplete] = useState(null);

    const onMapClick = (e) => {
        if (startMarkerVis === false){
            setStartMarkerPos(e.latLng);
            setStartMarkerVis(true);
            getGeocode(e.latLng,setStartMarkerAddress);
            const start = document.querySelector('#start');
            start.style.display = 'block';
            if (endMarkerVis) {
                const find = document.querySelector('#find');
                find.style.display = 'block';
            }
        } else if (endMarkerVis === false){
            setEndMarkerPos(e.latLng);
            setEndMarkerVis(true);
            getGeocode(e.latLng,setEndMarkerAddress);
            const destination = document.querySelector('#finish');
            destination.style.display = 'block';
            if (startMarkerVis) {
                const find = document.querySelector('#find');
                find.style.display = 'block';
            }
        }
    }

    const onStartMarkerClick = (e) => {
        setStartMarkerVis(false);
        setDirections(null);
        setShowDirections(null);
        setStartMarkerPos(null);
        setStartMarkerAddress('');
        const start = document.querySelector('#start');
        start.style.display = 'none';
        const find = document.querySelector('#find');
        find.style.display = 'none';

    }

    const onEndMarkerClick = (e) => {
        setEndMarkerVis(false);
        setDirections(null);
        setShowDirections(null);
        setEndMarkerPos(null);
        setEndMarkerAddress('')
        const destination = document.querySelector('#finish');
        destination.style.display = 'none';
        const find = document.querySelector('#find');
        find.style.display = 'none';
    }

    const directionsCallback = (response) => {
        if (response !== null){
            if (response.status === 'OK') {
                if (startMarkerPos != null && endMarkerPos != null && directions === null)
                setDirections(response)
            }
        }
    }

    const getDirections = () => {
        if (startMarkerPos != null && endMarkerPos != null){
            setShowDirections(true)
        }
    }

    const onAutocompleteLoad = (autocomp) => {
        setAutocomplete(autocomp)
    }

    const onAutocompleteChange = () => {
        const loc = autocomplete.getPlace().geometry.location
        if (startMarkerPos === null){
            setStartMarkerPos(loc)
            setStartMarkerVis(true)
            setcentre(loc)
            getGeocode(loc,setStartMarkerAddress)
        } else if (endMarkerPos === null){
            setEndMarkerPos(loc)
            setEndMarkerVis(true)
            setcentre(loc)
            getGeocode(loc,setEndMarkerAddress)
        }

    }

    const getGeocode = (latLng, setFunc) => {
        Geocode.fromLatLng(latLng.lat(),latLng.lng()).then(
            (response) => {
                setFunc(response.results[0].formatted_address)
            }, (error) => {
                console.error(error)
            }
        )
    }


    if (!isLoaded) return <div className={mapStyles.wrapper}>Loading...</div>

    return (
        <>
            <div className={mapStyles.padding}>
                <div className={mapStyles.wrapper}>
                    <GoogleMap
                        zoom={16}
                        center={centre}
                        mapContainerStyle={containerStyle}
                        onClick = {onMapClick}>
                        <Autocomplete onPlaceChanged={onAutocompleteChange} onLoad={onAutocompleteLoad}>
                            <input type="text" placeholder="Enter a place" style={{
                                boxSizing: `border-box`,
                                border: `1px solid transparent`,
                                width: `240px`,
                                height: `32px`,
                                padding: `0 12px`,
                                borderRadius: `3px`,
                                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                                fontSize: `14px`,
                                outline: `none`,
                                textOverflow: `ellipses`,
                                position: "absolute",
                                left: "50%",
                                marginLeft: "-120px"
                              }}/>
                        </Autocomplete>
                        <Marker key='start' visible={startMarkerVis} onClick={onStartMarkerClick} position={startMarkerPos}/>
                        <Marker key='end' visible={endMarkerVis} onClick={onEndMarkerClick} position={endMarkerPos}/>

                        {showDirections === true &&
                            <DirectionsService
                                options={{
                                    origin : startMarkerPos,
                                    destination : endMarkerPos,
                                    travelMode : "DRIVING"
                                }}
                                callback = {directionsCallback}/>}

                        {directions != null &&
                            <DirectionsRenderer directions={directions} options={{suppressMarkers: true}}/>}
                    </GoogleMap>
                    <div className={mapStyles.directions}>
                        <div className={`${mapStyles.field} ${mapStyles.location}`} id="start" style={{display: 'none'}}>
                            <div className={mapStyles.input}>
                                {startMarkerAddress == null ? '' : "Start: " + startMarkerAddress}
                            </div>
                        </div>
                        <div className={`${mapStyles.field} ${mapStyles.location}`} id="finish" style={{display: 'none'}}>
                            <div className={mapStyles.input}>
                                {endMarkerAddress == null ? '' : "Destination: " + endMarkerAddress}
                            </div>
                        </div>
                        <div id="find" className={`${mapStyles.field} ${mapStyles.btn} ${mapStyles.get}`} style={{display: 'none'}}>
                            <div className={mapStyles.btn_layer}>
                                <input type="submit" onClick={getDirections} value="Get Directions"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}
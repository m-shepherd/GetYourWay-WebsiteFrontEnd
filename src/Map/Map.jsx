import React from 'react';
import { useState } from 'react';
import PropTypes from "prop-types";
import { GoogleMap, useLoadScript, Marker, DirectionsRenderer, DirectionsService, Autocomplete } from '@react-google-maps/api';
import Geocode from 'react-geocode';
import mapStyles from './Map.module.css';
import './Map.css';
import {setStart, setDestination} from "./MapUtils";
import {LATITUDE, LONGITUDE} from "../configuration";

const MAPS_API_KEY = 'AIzaSyCodtVa1E5fxA5mM3Pd-wiZoPH3uwyreMI';

const libraries=["places","directions","geocoder"]

const transport = "DRIVING"

const containerStyle = {
    width: '650px',
    height: '450px'
};

const Map = ({setLatitude, setLongitude, setStartLocation, setEndLocation,
              setStartTime, setEndTime, handleSubmitJourney}) => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: MAPS_API_KEY,
        libraries
    });

    Geocode.setApiKey(MAPS_API_KEY)

    const [centre, setCentre] = useState({lat: LATITUDE, lng: LONGITUDE});
    const [startMarkerPos,setStartMarkerPos] = useState(null);
    const [endMarkerPos,setEndMarkerPos] = useState(null);
    const [startMarkerVis,setStartMarkerVis] = useState(false);
    const [endMarkerVis,setEndMarkerVis] = useState(false);
    const [startMarkerAddress,setStartMarkerAddress] = useState('');
    const [endMarkerAddress,setEndMarkerAddress] = useState('');
    const [directions,setDirections] = useState(null);
    const [showDirections,setShowDirections] = useState(false);
    const [startAutocomplete,setStartAutocomplete] = useState(null);
    const [endAutocomplete,setEndAutocomplete] = useState(null);

    const onMapClick = (e) => {
        if (startMarkerVis === false){
            setStartMarkerPos(e.latLng);
            setStartMarkerVis(true);
            getGeocode(e.latLng, setStartMarkerAddress);
            setStart(endMarkerVis);
        } else if (endMarkerVis === false){
            setEndMarkerPos(e.latLng);
            setLatitude(e.latLng.lat());
            setLongitude(e.latLng.lng());
            setEndMarkerVis(true);
            getGeocode(e.latLng,setEndMarkerAddress);
            setDestination(startMarkerVis);
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
        const destination = document.querySelector('#finish');
        destination.classList.remove('both');
        destination.classList.add('single');
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
        const start = document.querySelector('#start');
        start.classList.remove('both');
        start.classList.add('single');
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
            setStartLocation(startMarkerAddress)
            setEndLocation(endMarkerAddress)
            setStartTime("15:00")
            setEndTime("18:00")


        }
    }

    const onStartAutocompleteLoad = (autoComp) => {
        setStartAutocomplete(autoComp)
    }

    const onStartAutocompleteChange = () => {
        const loc = startAutocomplete.getPlace().geometry.location
        setStartMarkerPos(loc)
        setStartMarkerVis(true)
        setCentre(loc)
        getGeocode(loc,setStartMarkerAddress)

        setStart(endMarkerVis);
        setDirections(null);
        setShowDirections(null);

    }

    const onEndAutocompleteLoad = (autoComp) => {
        setEndAutocomplete(autoComp)
    }

    const onEndAutocompleteChange = () => {
        const loc = endAutocomplete.getPlace().geometry.location
        setEndMarkerPos(loc)
        setEndMarkerVis(true)
        setCentre(loc)
        getGeocode(loc,setEndMarkerAddress)

        setDestination(startMarkerVis);
        setDirections(null);
        setShowDirections(null);

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
                <div id="map" className={mapStyles.wrapper}>
                    <div className={mapStyles.map_container}>
                        <GoogleMap
                            zoom={12}
                            center={centre}
                            mapContainerStyle={containerStyle}
                            defaultOptions={{mapTypeControl: false}}
                            onClick = {onMapClick}>
                            <Autocomplete onPlaceChanged={onStartAutocompleteChange} onLoad={onStartAutocompleteLoad}>
                                <input type="text" placeholder="Enter Start Location" style={{
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
                                    left: "0%"
                                }}/>
                            </Autocomplete>
                            <Autocomplete onPlaceChanged={onEndAutocompleteChange} onLoad={onEndAutocompleteLoad}>
                                <input type="text" placeholder="Enter Destination" style={{
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
                                    left: "38%"
                                }}/>
                            </Autocomplete>
                            <Marker key='start' visible={startMarkerVis} onClick={onStartMarkerClick} position={startMarkerPos}/>
                            <Marker key='end' visible={endMarkerVis} onClick={onEndMarkerClick} position={endMarkerPos}/>

                            {showDirections === true &&
                                <DirectionsService
                                    options={{
                                        origin : startMarkerPos,
                                        destination : endMarkerPos,
                                        travelMode : transport
                                    }}
                                    callback = {directionsCallback}/>}

                            {directions != null &&
                                <DirectionsRenderer directions={directions} options={{suppressMarkers: true}}/>}
                        </GoogleMap>
                    </div>
                    <div className={mapStyles.directions}>
                        <div className={mapStyles.field} id="start" style={{display: 'none'}}>
                            <div className={mapStyles.input}>
                                {startMarkerAddress == null ? '' : "Start: " + startMarkerAddress}
                            </div>
                        </div>
                        <div className={mapStyles.field} id="finish" style={{display: 'none'}}>
                            <div className={mapStyles.input}>
                                {endMarkerAddress == null ? '' : "Destination: " + endMarkerAddress}
                            </div>
                        </div>
                        <div id="find" className={`${mapStyles.field} ${mapStyles.btn} ${mapStyles.get}`} style={{display: 'none'}}>
                            <div className={mapStyles.btn_layer}>
                                <input type="submit" onClick={getDirections} value="Get Directions"/>
                            </div>
                            <div className={mapStyles.btn_layer}>
                            <input type="submit" onClick={handleSubmitJourney} id="DRIVING" value="Add Leg To Journey"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

Map.propTypes = {
    setLatitude: PropTypes.func.isRequired,
    setLongitude: PropTypes.func.isRequired
}

export default Map
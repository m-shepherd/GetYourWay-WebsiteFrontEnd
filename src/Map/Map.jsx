import React from 'react';
import { useState, useEffect } from 'react';
import { GoogleMap, useLoadScript, Marker, DirectionsRenderer, DirectionsService, Autocomplete } from '@react-google-maps/api';
import Geocode from 'react-geocode';
import mapStyles from './Map.module.css';
import './Map.css';
import {setStart, setDestination} from "./MapUtils";

const MAPS_API_KEY = 'AIzaSyCodtVa1E5fxA5mM3Pd-wiZoPH3uwyreMI';

const libraries=["places","directions","geocoder"]

const containerStyle = {
    width: '650px',
    height: '450px'
};


const Map = ({setDepartureLatitude, setDepartureLongitude, setArrivalLatitude, setArrivalLongitude, setLatitude, setLongitude, setStartTime, setEndTime, setDuration, handleSubmitJourney, setStartName, startName, setDestinationName, destinationName, startMarkerPos, setStartMarkerPos, endMarkerPos, setEndMarkerPos, showDirections, setShowDirections, directions, setDirections, centre, setCentre}) => {

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: MAPS_API_KEY,
        libraries
    });

    Geocode.setApiKey(MAPS_API_KEY)

    const [startMarkerVis,setStartMarkerVis] = useState(false);
    const [endMarkerVis,setEndMarkerVis] = useState(false);
    const [timeTaken,setTimeTaken] = useState('')
    const [departTime,setDepartTime] = useState();
    const [userSetDepart, setUserSetDepart] = useState(false);
    const [arrivalTime,setArrivalTime] = useState('');

    const [startAutocomplete,setStartAutocomplete] = useState(null);
    const [endAutocomplete,setEndAutocomplete] = useState(null);

    const [btnValue, setBtnValue] = useState("Add Drive To Journey");

    useEffect(() => {
        if (!userSetDepart || !showDirections) {
            const time = new Date().toLocaleString('en-GB', {
                timeZone: 'Europe/London',
            }).split(',')[1].substring(1, 6)
            setDepartTime(time)
        }
    }, [userSetDepart, showDirections])


    const onMapClick = (e) => {
        if (startMarkerVis === false){
            setStartMarkerPos(e.latLng);
            setDepartureLatitude(e.latLng.lat());
            setDepartureLongitude(e.latLng.lng());
            setStartMarkerVis(true);
            getGeocode(e.latLng, setStartName);
            setStart(endMarkerVis);
        } else if (endMarkerVis === false){
            setEndMarkerPos(e.latLng);
            setArrivalLatitude(e.latLng.lat());
            setArrivalLongitude(e.latLng.lng());
            setEndMarkerVis(true);
            getGeocode(e.latLng, setDestinationName);
            setDestination(startMarkerVis);
            setLatitude(e.latLng.lat())
            setLongitude(e.latLng.lng())
        }
    }

    const onStartMarkerClick = (e) => {
        setDirections(null);
        setShowDirections(null);
        setStartMarkerPos(null);
        setStartName('');
        const start = document.querySelector('#start');
        start.style.display = 'none';
        const destination = document.querySelector('#finish');
        destination.classList.remove('both');
        destination.classList.add('single');
        const find = document.querySelector('#find');
        find.style.display = 'none';
        const add = document.querySelector('#add');
        add.style.display = 'none';
        const times = document.querySelector('#times');
        times.style.display = 'none';
    }

    const onEndMarkerClick = (e) => {
        setEndMarkerVis(false);
        setDirections(null);
        setShowDirections(null);
        setEndMarkerPos(null);
        setDestinationName('')
        const destination = document.querySelector('#finish');
        destination.style.display = 'none';
        const start = document.querySelector('#start');
        start.classList.remove('both');
        start.classList.add('single');
        const find = document.querySelector('#find');
        find.style.display = 'none';
        const add = document.querySelector('#add');
        add.style.display = 'none';
        const times = document.querySelector('#times');
        times.style.display = 'none';
    }

    useEffect(() => {
        if (startMarkerPos == null) {
            setStartMarkerVis(false);
        } else {
            setStartMarkerVis(true);
        }
    }, [startMarkerPos]);

    useEffect(() => {
        if (endMarkerPos == null) {
            setEndMarkerVis(false);
        } else {
            setEndMarkerVis(true);
        }
    }, [endMarkerPos]);

    const directionsCallback = (response) => {
        if (response !== null){
            if (response.status === 'OK') {
                if (startMarkerPos != null && endMarkerPos != null && directions == null)
                    setStart(endMarkerVis);
                    setDestination(startMarkerVis);
                    setDirections(response)
                    setDuration(response.routes[0].legs[0].duration.text)
                    setTimeTaken(response.routes[0].legs[0].duration.text)
                    if (startName === ''){
                        getGeocode(startMarkerPos,setStartName)
                    }
                    const startmins = getMinsFromInput(departTime)
                    const durationmins = getMinsFromDuration(response.routes[0].legs[0].duration.text)
                    const totalmins = startmins + durationmins
                    const time = getTimeFromMins(totalmins)

                    setStartTime(departTime)
                    setArrivalTime(time)
                    setEndTime(time)
            }
        }
    }

    const getDirections = () => {
        if (startMarkerPos != null && endMarkerPos != null){
            setShowDirections(true)
            const add = document.getElementById('add')
            const times = document.querySelector('#times');
            add.style.display = 'block';
            times.style.display = 'grid';
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
        getGeocode(loc, setStartName)

        setStart(endMarkerVis);
        setDirections(null);
        setShowDirections(null);
        setDepartureLatitude(loc.lat());
        setDepartureLongitude(loc.lng());

    }

    const onEndAutocompleteLoad = (autoComp) => {
        setEndAutocomplete(autoComp)
    }

    const onEndAutocompleteChange = () => {
        const loc = endAutocomplete.getPlace().geometry.location
        setEndMarkerPos(loc)
        setEndMarkerVis(true)
        setCentre(loc)
        getGeocode(loc, setDestinationName)
        setLatitude(loc.lat())
        setLongitude(loc.lng())

        setDestination(startMarkerVis);
        setDirections(null);
        setShowDirections(null);
        setArrivalLatitude(loc.lat());
        setArrivalLongitude(loc.lng());

    }

    const getGeocode = (latLng, setNameFunc) => {
        var latitude;
        var longitude;
        if (typeof latLng.lat != 'number'){
             latitude = latLng.lat()
             longitude = latLng.lng()
        } else {
             latitude = latLng.lat
             longitude = latLng.lng
        }
        Geocode.fromLatLng(latitude,longitude).then(
            (response) => {
                setNameFunc(response.results[0].formatted_address);
                // if (response.results[0].address_components != null) {
                //     setNameFunc(getLocationNameFromGeocode(response.results[0]));
                // }
            }, (error) => {
                console.error(error)
            }
        )
    }

    const departChanged = (e) => {
        const t = e.target.value
        setDepartTime(t)
        const startmins = getMinsFromInput(t)
        const durationmins = getMinsFromDuration(timeTaken)
        const totalmins = startmins + durationmins
        const time = getTimeFromMins(totalmins)
        setArrivalTime(time)
        setStartTime(departTime)
        setEndTime(arrivalTime)
        setUserSetDepart(true);
    }

    const arrivalChanged = (e) => {
        const t = e.target.value
        setArrivalTime(t)
        const startmins = getMinsFromInput(t)
        const durationmins = getMinsFromDuration(timeTaken)
        let totalmins = startmins - durationmins
        if (totalmins < 0){
            totalmins += 1440
        }
        const time = getTimeFromMins(totalmins)
        setDepartTime(time)
        setStartTime(departTime)
        setEndTime(arrivalTime)
    }

    const getMinsFromInput = (time) => {
        const hours = parseInt(time.slice(0,2))
        const mins = parseInt(time.slice(3))
        return mins + (hours*60)
    }

    const getMinsFromDuration = (time) => {
        let totalMins = 0
        const timeArray = time.split(/\s+/)
        for (let i = 0; i < timeArray.length; i += 2) {
            if (timeArray[i+1] === "min" || timeArray[i+1] === "mins"){
                totalMins += parseInt(timeArray[i])
            } else if (timeArray[i+1] === "hour" || timeArray[i+1] === "hours"){
                totalMins += parseInt(timeArray[i])*60
            } else if (timeArray[i+1] === "day" || timeArray[i+1] === "days"){
                totalMins += parseInt(timeArray[i])*1440
            }
        }
        return totalMins
    }

    const getTimeFromMins = (mins) => {
        let hour = (Math.floor(mins/60) % 24).toString()
        let minute = (mins % 60).toString()
        if (hour.length === 1){
            hour = '0'+hour
        }
        if (minute.length === 1){
            minute = '0'+minute
        }
        return hour+":"+minute
    }

    const getLocationNameFromGeocode = (resultObject) => {
        let locationName = '';
        const addressComponents = resultObject.address_components;
        const areaName = addressComponents.filter(component => component['types'].includes('postal_town'));
        const localityName = addressComponents.filter(component => component['types'].includes('locality'));
        if (areaName.length >= 1 && areaName[0] !== null) {
            locationName += areaName[0]['long_name'] + ', ';
        } else if (localityName.length >= 1 && localityName[0] !== null) {
            locationName += localityName[0]['long_name'] + ', ';
        }
        const countryName = addressComponents.filter(component => component['types'].includes('country'));
        if(countryName.length >= 1 && countryName[0] !==null) {
            locationName += countryName[0]['long_name'];
        }
        return locationName;

    }

    useEffect(() => {
        if (btnValue === 'Adding Drive...') {
            setTimeout(() => {setBtnValue("Added Drive")}, 2000)
        } else if (btnValue === 'Added Drive') {
            setTimeout(() => {setBtnValue("Add Drive To Journey")}, 1000)
        }
    }, [btnValue])

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

                            {showDirections === true && directions === null &&
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
                    </div>
                    <div className={mapStyles.directions}>
                        <div className={`${mapStyles.field} ${mapStyles.location}`} id="start" style={{display: 'none'}}>
                            <div className={mapStyles.input}>
                                {startName == null ? '' : "Start: " + startName}
                            </div>
                        </div>
                        <div id="find" className={`${mapStyles.field} ${mapStyles.btn} ${mapStyles.get}`} style={{display: 'none'}}>
                            <div className={mapStyles.btn_layer}>
                                <input type="submit" onClick={getDirections} value="Get Directions" className={mapStyles.btn_working}/>
                            </div>
                        </div>
                        <div className={`${mapStyles.field} ${mapStyles.location}`} id="finish" style={{display: 'none'}}>
                            <div className={mapStyles.input}>
                                {destinationName == null ? '' : "Destination: " + destinationName}
                            </div>
                        </div>
                        <div id="add" className={btnValue === "Adding Drive..." ? `${mapStyles.field_disabled} ${mapStyles.btn} ${mapStyles.get}`: btnValue === "Added Drive" ? `${mapStyles.field_added} ${mapStyles.btn} ${mapStyles.get}` :`${mapStyles.field} ${mapStyles.btn} ${mapStyles.get}`} style={showDirections ? {display: 'block'} : {display: 'none'}}>
                            <div className={btnValue === "Adding Drive..." ? mapStyles.btn_layer_disabled : btnValue === "Added Drive" ? mapStyles.btn_layer_added : mapStyles.btn_layer}>
                                <input type="submit" onClick={(e) => {
                                    setBtnValue("Adding Drive...");
                                    handleSubmitJourney(e)
                                }} id="DRIVING" value={btnValue} disabled={btnValue !== "Add Drive To Journey"}
                                       className={btnValue === "Adding Drive..." ? mapStyles.btn_disabled : btnValue === "Added Drive" ? mapStyles.btn_added: mapStyles.btn_working}/>
                            </div>
                        </div>
                    </div>
                    
                    <div id="times" className={mapStyles.times} style={showDirections ? {display: 'grid'} : {display: 'none'}}>
                        <div className={`${mapStyles.field} ${mapStyles.timediv}`} id="departTime" >
                            <div className={mapStyles.input}>
                                <input type='time' className={mapStyles.time} onChange={departChanged} value={departTime}/>
                            </div>
                        </div>
                        <div className={`${mapStyles.field} ${mapStyles.timediv}`} id="arrivalTime" >
                            <div className={mapStyles.input}>
                                <input type='time' className={mapStyles.time} onChange={arrivalChanged} value={arrivalTime}/>
                            </div>
                        </div>
                        <div className={`${mapStyles.field} ${mapStyles.timediv}`} id="duration" >
                            <div className={mapStyles.input}>
                                {timeTaken === '' ? '' : "Duration: " + timeTaken}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default Map
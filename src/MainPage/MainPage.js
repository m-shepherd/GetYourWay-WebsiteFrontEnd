import {useNavigate} from "react-router-dom";
import {useState} from "react";
import mainStyles from'./MainPage.module.css';
import './MainPage.css';
import Weather from '../Weather/Weather'
import Flights from '../Flights/Flights'
import Map from "../Map/Map";
<<<<<<< HEAD
import {LATITUDE, LONGITUDE} from "../configuration";
import NearestAirport from "../NearestAirport/NearestAirport";
=======
import {LATITUDE, LONGITUDE, DESTINATION_NAME} from "../configuration";
>>>>>>> main

const MainPage = () => {
    const [departureLatitude, setDepartureLatitude] = useState(LATITUDE);
    const [departureLongitude, setDepartureLongitude] = useState(LONGITUDE);
    const [arrivalLatitude, setArrivalLatitude] = useState(LATITUDE);
    const [arrivalLongitude, setArrivalLongitude] = useState(LONGITUDE);
    const [nearestArrivalAirports, setNearestArrivalAirports] = useState();
    const [nearestDepartureAirports, setNearestDepartureAirports] = useState();

    let navigate = useNavigate();

    function logOut() {
        localStorage.removeItem('auth');
        navigate('/')
    }

<<<<<<< HEAD
=======
    const [latitude, setLatitude] = useState(LATITUDE);
    const [longitude, setLongitude] = useState(LONGITUDE);
    const [startName, setStartName] = useState(DESTINATION_NAME);
    const [destinationName, setDestinationName] = useState('');

>>>>>>> main
    let data;
    if (localStorage.getItem('auth') == null) {
        data =
            <>
                <div className={mainStyles.error_wrapper}>
                    <div className={mainStyles.error}>User Not Logged In</div>
                    <div className={mainStyles.padding}>
                        <div className={mainStyles.pass_link} onClick={logOut}><a href="">Go To Login</a></div>
                    </div>
                </div>
            </>;
    } else {
        data =
            <>
                <div className={mainStyles.padding}>
                    <div className={mainStyles.wrapper}>
                        <div className={mainStyles.title_text}>
                            <div className={mainStyles.title}>Main Page</div>
                        </div>
                        <div className={mainStyles.pass_link} onClick={logOut}><a href="">Log Out</a></div>
                        <div className={mainStyles.pass_link}><a href="#map">Map</a></div>
                        <div className={mainStyles.pass_link}><a href="#findFlights">Find Flights</a></div>
                    </div>
                </div>

                <Map setDepartureLatitude={setDepartureLatitude} setDepartureLongitude={setDepartureLongitude} setArrivalLatitude={setArrivalLatitude} setArrivalLongitude={setArrivalLongitude} setStartName={setStartName} setDestinationName={setDestinationName}/>
                <Weather latitude={arrivalLatitude} longitude={arrivalLongitude}/>
                <NearestAirport latitude={departureLatitude} longitude={departureLongitude} setNearestAirports={setNearestDepartureAirports}/>
                <NearestAirport latitude={arrivalLatitude} longitude={arrivalLongitude} setNearestAirports={setNearestArrivalAirports}/>
                <Flights nearestDepartureAirports={nearestDepartureAirports} nearestArrivalAirports={nearestArrivalAirports}/>
            </>;
    }

    return data;

}

export default MainPage;
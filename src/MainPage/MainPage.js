import {useNavigate} from "react-router-dom";
import {useState} from "react";
import mainStyles from'./MainPage.module.css';
import './MainPage.css';
import Weather from '../Weather/Weather'
import Flights from '../Flights/Flights'
import Map from "../Map/Map";
import NearestAirport from "../Flights/NearestAirport";
import Shows from '../Shows/Shows';
import {LATITUDE, LONGITUDE} from "../configuration";

const MainPage = ({setSubmittedJourney, legId, setLegId}) => {
    const [departureLatitude, setDepartureLatitude] = useState(LATITUDE);
    const [departureLongitude, setDepartureLongitude] = useState(LONGITUDE);
    const [arrivalLatitude, setArrivalLatitude] = useState(LATITUDE);
    const [arrivalLongitude, setArrivalLongitude] = useState(LONGITUDE);
    const [nearestArrivalAirports, setNearestArrivalAirports] = useState();
    const [nearestDepartureAirports, setNearestDepartureAirports] = useState();
    const [startTime, setStartTime] = useState()
    const [endTime, setEndTime] = useState("")
    const [duration, setDuration] = useState("")
    const [latitude, setLatitude] = useState(LATITUDE);
    const [longitude, setLongitude] = useState(LONGITUDE);
    const [startName, setStartName] = useState('');
    const [destinationName, setDestinationName] = useState('');
    const [startMarkerPos,setStartMarkerPos] = useState(null);
    const [endMarkerPos,setEndMarkerPos] = useState(null);
    const [showDirections,setShowDirections] = useState(false);
    const [directions,setDirections] = useState(null);
    const [centre, setCentre] = useState({lat: LATITUDE, lng: LONGITUDE});

    let navigate = useNavigate();

    const handleSubmitJourney = (e) => {
        e.preventDefault()
        setSubmittedJourney({
            "id": legId,
            "transport": e.target.getAttribute("id"),
            "startLocation": startName,
            "startTime": startTime,
            "endLocation": destinationName,
            "endTime": endTime,
            "duration": duration
    })  
        setLegId(legId + 1);
    }


    function logOut() {
        localStorage.removeItem('auth');
        navigate('/')
    }

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
                            <div className={mainStyles.title}>DAMM - Get Your Way</div>
                        </div>
                        <div className={mainStyles.headerBar}>
                            <div className={mainStyles.pass_link} onClick={logOut}><a href="">Log Out</a></div>
                            <div className={mainStyles.pass_link}><a href="#map">Map</a></div>
                            <div className={mainStyles.pass_link}><a href="#findFlights">Find Flights</a></div>
                            <div className={mainStyles.pass_link}><a href="#" onClick={() => navigate("/ViewJourney")}>View Journey</a></div>
                        </div>
                    </div>
                </div>

                <Shows setDepartureLatitude={setDepartureLatitude} setDepartureLongitude={setDepartureLongitude} setArrivalLatitude={setArrivalLatitude} setArrivalLongitude={setArrivalLongitude} setStartMarkerPos={setStartMarkerPos} setEndMarkerPos={setEndMarkerPos} setLatitude={setLatitude} setLongitude={setLongitude} setShowDirections={setShowDirections}
                        startMarkerPos={startMarkerPos} showDirections={showDirections} endMarkerPos={endMarkerPos} setDirections={setDirections} setDestinationName={setDestinationName} setCentre={setCentre} directions={directions} />

                <Map setDepartureLatitude={setDepartureLatitude} setDepartureLongitude={setDepartureLongitude} setArrivalLatitude={setArrivalLatitude} setArrivalLongitude={setArrivalLongitude} setLatitude={setLatitude} setLongitude={setLongitude}
                  setStartTime={setStartTime} setEndTime={setEndTime} setDuration={setDuration} handleSubmitJourney={handleSubmitJourney} setStartName={setStartName} startName={startName} setDestinationName={setDestinationName} destinationName={destinationName}
                  startMarkerPos={startMarkerPos} setStartMarkerPos={setStartMarkerPos} endMarkerPos={endMarkerPos} setEndMarkerPos={setEndMarkerPos} 
                  showDirections={showDirections} setShowDirections={setShowDirections} setDirections={setDirections} directions={directions} centre={centre} setCentre={setCentre} />


                <NearestAirport latitude={departureLatitude} longitude={departureLongitude} setNearestAirports={setNearestDepartureAirports}/>
                <NearestAirport latitude={arrivalLatitude} longitude={arrivalLongitude} setNearestAirports={setNearestArrivalAirports}/>

                <Weather latitude={latitude} longitude={longitude} startName={startName} destinationName={destinationName}/>

                <Flights setStartLocation={setStartName} setEndLocation={setDestinationName} setStartTime={setStartTime} setEndTime={setEndTime} setDuration={setDuration} handleSubmitJourney={handleSubmitJourney} nearestDepartureAirports={nearestDepartureAirports} nearestArrivalAirports={nearestArrivalAirports} endLocation={destinationName} />
            </>;
    }

    return data;

}

export default MainPage;
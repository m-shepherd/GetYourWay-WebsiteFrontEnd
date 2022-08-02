import {useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";
import mainStyles from'./MainPage.module.css';
import './MainPage.css';
import Weather from '../Weather/Weather'
import Flights from '../Flights/Flights'
import Map from "../Map/Map";
import {LATITUDE, LONGITUDE} from "../configuration";

const MainPage = ({setSubmittedJourney, legId, setLegId}) => {

    let navigate = useNavigate();


    const [startLocation, setStartLocation] = useState("")
    const [endLocation, setEndLocation] = useState("")
    const [transport, setTransport] = useState("")
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")
    const [duration, setDuration] = useState("")





    const handleSubmitJourney = (e) => {
        e.preventDefault()
        setSubmittedJourney({
            "id": legId,
            "transport": transport,
            "startLocation": startLocation,
            "startTime": startTime,
            "endLocation": endLocation,
            "endTime": endTime,
            "duration": duration
    })  
        setLegId(legId + 1);
    }


    function logOut() {
        localStorage.removeItem('auth');
        navigate('/')
    }

    const [latitude, setLatitude] = useState(LATITUDE);
    const [longitude, setLongitude] = useState(LONGITUDE);
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

                <Map setLatitude={setLatitude} setLongitude={setLongitude} setStartLocation={setStartLocation}
                 setEndLocation={setEndLocation} setTransport={setTransport} setStartTime={setStartTime} 
                 setEndTime={setEndTime} setDuration={setDuration} handleSubmitJourney={handleSubmitJourney}/>

                <Weather latitude={latitude} longitude={longitude}/>
                <Flights/>
                <div>
                <button onClick={() => navigate("/ViewJourney")}>View Journey Steps</button>
                </div>
            </>;
    }

    return data;

}

export default MainPage;
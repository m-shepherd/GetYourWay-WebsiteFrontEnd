import flightStyles from'./Flights.module.css';
import './Flights.css'
import {makeRowsClickable, confirmFlights} from "./FlightsUtils";
import {useEffect} from "react";
import axios from "axios";
import {BACKEND_ADDRESS} from "../configuration";
import {useState} from "react";

const Flights = ({nearestDepartureAirports, nearestArrivalAirports}) => {
    const [flights, setFlights] = useState();
    const [counter, setCounter] = useState(0);

    const fillInForm = () => {
        const departureAirport = document.querySelector("#departureAirport");
        const arrivalAirport = document.querySelector("#arrivalAirport");

        departureAirport.value = nearestDepartureAirports[counter]
        arrivalAirport.value = nearestArrivalAirports[0]

    }

    function getFlights(event) {
        // event.preventDefault();
        const flightTable = document.querySelector("#flightTable");
        const flightData = document.querySelector("#flightData");
        const dataTitle = document.querySelector("#dataTitle");
        flightData.style.display = "block";
        dataTitle.style.display = "block";
        for(let i = 0; i < flights.length; i++) {
            const row = flightTable.insertRow(-1)
            row.setAttribute('data-href', '#');
            let i = 0;
            for (const key in flights[i]) {
                if (i !== 0) {
                    const cell = row.insertCell(i - 1);
                    cell.innerHTML = flights[i][key];
                }
                i ++;
            }
        }
        makeRowsClickable();
    }

    const noFlights = () => {
        const dataTitle = document.querySelector("#dataTitle");
        const title = document.querySelector("#title");
        dataTitle.style.display = "block";
        title.innerHTML = "No Flights Available";
    }

    useEffect(() => {
        setCounter(0);
    }, [nearestDepartureAirports, nearestArrivalAirports])

    useEffect(() => {

        const getNearestAirports = () => {
                console.log(BACKEND_ADDRESS + "/flights?date=2022-08-02&dep=" + nearestDepartureAirports[counter] +"&arr=" + nearestArrivalAirports[0])
                axios.get(BACKEND_ADDRESS + "/flights?date=2022-08-02&dep=" + nearestDepartureAirports[counter] +"&arr=" + nearestArrivalAirports[0], {
                    headers: {
                        'Authorization': `Basic ${localStorage.getItem('auth')}`
                    }
                }).then(response => {
                    console.log(response);
                    if (response['data'] !== '') {
                        setFlights(response['data']);
                        fillInForm();
                    } else {
                        if (counter >= nearestDepartureAirports.length - 1) {
                            noFlights();
                        } else {
                            const counterValue = counter + 1
                            setCounter(counterValue)
                        }
                    }

                }).catch(error => {
                    console.log('Could not fetch nearest airport data');
                    console.error(error);
                    noFlights();
                });

        }

        getNearestAirports();

    }, [nearestArrivalAirports, nearestDepartureAirports, counter]);

    return (
        <>
            <div className={flightStyles.padding}>
                <div className={flightStyles.wrapper}>
                    <div className={flightStyles.form_container}>
                        <div className={flightStyles.form_inner}>
                            <form id="findFlights" onSubmit={getFlights}>
                                <div className={`${flightStyles.field} ${flightStyles.col}`}>
                                    <input type="date" id="date" min={new Date().toISOString().split('T')[0]} placeholder="YYYY-MM-DD"/>
                                </div>
                                <div className={`${flightStyles.field} ${flightStyles.col}`}>
                                    <input type="text" id="departureAirport" placeholder="Departure Airport"/>
                                </div>
                                <div className={`${flightStyles.field} ${flightStyles.col}`}>
                                    <input type="text" id="arrivalAirport" placeholder="Arrival Airport"/>
                                </div>
                                <div className={`${flightStyles.field} ${flightStyles.btn} ${flightStyles.col}`}>
                                    <div className={flightStyles.btn_layer}></div>
                                    <input type="submit" value="Find Flights"/>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div id="dataTitle" className={flightStyles.title_text} style={{display: "none"}}>
                        <div id="title" className={flightStyles.title}>Flight Data</div>
                    </div>
                    <div className={flightStyles.padding}>
                        <div id="flightData" className={flightStyles.tableFixHead} style={{display: "none"}}>
                            <table id="table">
                                <thead>
                                <th>Departure Airport</th>
                                <th>Departure Time</th>
                                <th>Arrival Airport</th>
                                <th>Arrival Time</th>
                                <th>Airline</th>
                                <th>Flight Number</th>
                                </thead>
                                <tbody id="flightTable"></tbody>
                            </table>
                        </div>
                    </div>
                    <div id="destination" className={`${flightStyles.field} ${flightStyles.btn}`} style={{display: "none"}}>
                        <div className={flightStyles.btn_layer}></div>
                        <input id="confirm" type="submit" onClick={confirmFlights} value="Confirm Flight"/>
                    </div>
                </div>
            </div>
        </>
    );
}

Flights.defaultProps = {
    nearestDepartureAirports: [''],
    nearestArrivalAirports: ['']
}

export default Flights;
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
        event.preventDefault();
        const flightTable = document.querySelector("#flightTable");
        const flightData = document.querySelector("#flightData");
        const dataTitle = document.querySelector("#dataTitle");
        try {
            flightTable.innerHTML = "";
            flightData.style.display = "block";
            const title = document.querySelector("#title");
            title.innerHTML = "Flight Data";
            dataTitle.style.display = "block";
            let numberOfRows = -1;
            for (let i = 0; i < flights.length; i++) {
                        const row = flightTable.insertRow(-1)
                        numberOfRows ++;
                        row.setAttribute('data-href', '#');
                        const expand = row.insertCell(0);
                if (flights[i]['airports'].length > 2) {
                    expand.innerHTML = "<i class='arrow' style='display:none'></i>"
                }
                        for (let j = 1; j < 6; j++) {
                            switch (j) {
                                case 1:
                                    const arr = row.insertCell(j);
                                    arr.innerHTML = flights[i]['airports'][0];
                                    break;
                                case 2:
                                    const arrT = row.insertCell(j);
                                    arrT.innerHTML = flights[i]['times'][0];
                                    break;
                                case 3:
                                    const dep = row.insertCell(j);
                                    dep.innerHTML = flights[i]['airports'][flights[i]['airports'].length - 1];
                                    break;
                                case 4:
                                    const depT = row.insertCell(j);
                                    depT.innerHTML = flights[i]['times'][flights[i]['times'].length - 1];
                                    break;
                                case 5:
                                    const price = row.insertCell(j);
                                    price.innerHTML = "£" + flights[i]['price'] + "0";
                                    break;
                            }
                        }
                        if (flights[i]['airports'].length > 2) {
                            let numberOfChildRows = 0;
                            for (let j = 0; j < flights[i]['airports'].length - 1; j++) {
                                const childRow = flightTable.insertRow(-1)
                                numberOfChildRows ++;
                                childRow.setAttribute('data-href', '#');
                                childRow.setAttribute('name', numberOfRows + 'child')
                                childRow.setAttribute("style", "display:none")

                                childRow.insertCell(0)
                                const cell1 = childRow.insertCell(1);
                                cell1.innerHTML = flights[i]['airports'][j]
                                const cell2 = childRow.insertCell(2);
                                cell2.innerHTML = flights[i]['times'][j * 2]
                                const cell3 = childRow.insertCell(3);
                                cell3.innerHTML = flights[i]['airports'][j + 1]
                                const cell4 = childRow.insertCell(4);
                                cell4.innerHTML = flights[i]['times'][j * 2 + 1]
                                childRow.insertCell(5)
                            }
                            numberOfRows += numberOfChildRows;
                        }
                }

            makeRowsClickable();
        } catch (e) {
            console.log(e);
            flightData.style.display = "none";
            dataTitle.style.display = "none";
            noFlights();
        }
    }

    const noFlights = () => {
        const flightData = document.querySelector("#flightData");
        const dataTitle = document.querySelector("#dataTitle");
        const title = document.querySelector("#title");
        flightData.style.display = "none";
        dataTitle.style.display = "block";
        title.innerHTML = "No Flights Available";
    }

    useEffect(() => {
        fillInForm();
        document.getElementById("formSubmit").click();
    }, [flights])

    useEffect(() => {
        setCounter(0);
    }, [nearestDepartureAirports, nearestArrivalAirports])

    useEffect(() => {

        const getNearestAirports = () => {
            if (nearestDepartureAirports[counter] !== nearestArrivalAirports[0]) {
                const flightData = document.querySelector("#flightData");
                const dataTitle = document.querySelector("#dataTitle");
                const title = document.querySelector("#title");
                flightData.style.display = "none";
                dataTitle.style.display = "block";
                title.innerHTML = "Searching For Flights...";
                console.log(BACKEND_ADDRESS + "/flights?date=2022-11-01&dep=" + nearestDepartureAirports[0] + "&arr=" + nearestArrivalAirports[0])
                axios.get(BACKEND_ADDRESS + "/flights?date=2022-11-01&dep=" + nearestDepartureAirports[0] + "&arr=" + nearestArrivalAirports[0], {
                    headers: {
                        'Authorization': `Basic ${localStorage.getItem('auth')}`
                    }
                }).then(response => {
                    console.log(response);
                    if (response['data'] !== '') {
                        setFlights(response['data']);
                        fillInForm();
                    } else {
                        const flightTable = document.querySelector("#flightTable");
                        flightTable.innerHTML = "";
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
                                    <input id="formSubmit" type="submit" value="Find Flights"/>
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
                                <th></th>
                                <th>Departure Airport</th>
                                <th>Departure Time</th>
                                <th>Arrival Airport</th>
                                <th>Arrival Time</th>
                                <th>Price</th>
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
import flightStyles from'./Flights.module.css';
import './Flights.css'
import {makeRowsClickable} from "./FlightsUtils";
import {useEffect} from "react";
import axios from "axios";
import {BACKEND_ADDRESS} from "../configuration";
import {useState} from "react";
import moment from "moment";


const Flights = ({nearestDepartureAirports, nearestArrivalAirports, setStartLocation, setEndLocation, setStartTime, setEndTime, setDuration, handleSubmitJourney, endLocation, legId}) => {
    const [flights, setFlights] = useState();
    const [date, setDate] = useState("2022-08-05");
    const [legs, setLegs] = useState([]);

    function updateDate(event) {
        setDate(event.target.value);
    }

    function confirmFlights() {
        const clickedItems = document.getElementsByClassName('clicked');
        if (clickedItems.length === 1) {
            const flightData = [];
            const childFlightData = [];
            const selectedFlights = clickedItems[0];

            const childRowsName = selectedFlights.rowIndex+ 'child';
            const childRows = document.getElementsByName(childRowsName);

            selectedFlights.childNodes.forEach(
                function(detail) {
                    flightData.push(detail.textContent);
                });

            for (let i = 0; i < childRows.length; i++) {
                for (let j = 0; j < childRows[i].childNodes.length; j++) {
                    if (childRows[i].children[j].textContent !== '') {
                        childFlightData.push(childRows[i].children[j].textContent)
                    }
                }
            }

            const jsonFields = ['departure_airport', 'departure_time', 'arrival_airport',
                'arrival_time', 'duration', 'price']

            let jsonData = "{";
            for (let i = 0; i <flightData.length - 1; i++) {
                if (i === flightData.length - 2) {
                    jsonData += '"' + jsonFields[i] + '": "' + flightData[i + 1] + '"';
                } else {
                    jsonData += '"' + jsonFields[i] + '": "' + flightData[i + 1] + '",';
                }
            }
            let legInfo = '['
            for (let i = 0; i < childFlightData.length - 1; i+= 5) {
                let leg = ''
                if (i !== childFlightData.length - 2) {
                    for (let j = 0; j < 5; j++) {
                        if (j === 0) {
                            leg += '{"departure": {'
                        }
                        if (j === 2) {
                            leg += '"arrival": {'
                        }
                        if (j === 1) {
                            leg += '"' + jsonFields[j] + '": "' + childFlightData[j + i] + '"'
                            leg += '},'
                        } else if (j === 3) {
                            leg += '"' + jsonFields[j] + '": "' + childFlightData[j + i] + '"'
                            leg += '}';
                        } else if (j === 4) {
                            leg += ',"' + jsonFields[j] + '": "' + childFlightData[j + i] + '"}'
                        } else {
                            leg += '"' + jsonFields[j] + '": "' + childFlightData[j + i] + '",'
                        }
                    }
                    if (i + 4 < childFlightData.length - 1) {
                        legInfo += leg + ','
                    } else {
                        legInfo += leg
                    }
                }
            }
            jsonData += ',"legs":' + legInfo + ']';

            jsonData += '}';

            const legData = JSON.parse(jsonData);

            if (legData['legs'].length > 0) {
                    setLegs(legData['legs']);
            } else {
                setLegs([legData]);
            }
        }
    }

    function getFlights() {
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
                    expand.innerHTML = "<i class='arrow'></i>"
                }
                        for (let j = 1; j < 7; j++) {
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
                                    const totalDuration = row.insertCell(j);
                                    const duration = moment.duration(flights[i]['durations'][0])
                                    if (duration.minutes() === 0) {
                                        totalDuration.innerHTML = duration.hours() + "H"
                                    } else {
                                        totalDuration.innerHTML = duration.hours() + "H:" + String(duration.minutes()).padStart(2, "0").padEnd(2, "0") + "M";
                                    }
                                    break;
                                case 6:
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
                                const cell5 = childRow.insertCell(5);
                                const childDuration = moment.duration(flights[i]['durations'][j + 1])
                                if (childDuration.minutes() === 0) {
                                    cell5.innerHTML = childDuration.hours() + "H"
                                } else {
                                    cell5.innerHTML = childDuration.hours() + "H:" + String(childDuration.minutes()).padStart(2, "0").padEnd(2, "0") + "M";
                                }
                                childRow.insertCell(6)

                            }
                            numberOfRows += numberOfChildRows;
                        }
                }

            makeRowsClickable();
        } catch (e) {
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
        getFlights()
    }, [flights]);

    useEffect(() => {
        if (endLocation && legs.length > 0) {
            document.getElementById("FLYING").click();
            legs.shift()
            setLegs([...legs])
        }
    }, [endLocation])

    useEffect(() => {
        if (legs.length > 0) {
            if (legs.length > 1) {
                setEndLocation(legs[0]['arrival']['arrival_airport'])
                setEndTime(legs[0]['arrival']['arrival_time'])
                setStartLocation(legs[0]['departure']['departure_airport'])
                setStartTime(legs[0]['departure']['departure_time'])
                setDuration(legs[0]['duration'])
            } else {
                setEndLocation(legs[0]['arrival_airport'])
                setEndTime(legs[0]['arrival_time'])
                setStartLocation(legs[0]['departure_airport'])
                setStartTime(legs[0]['departure_time'])
                setDuration(legs[0]['duration'])
            }

        }
    }, [legs])

    useEffect(() => {

        const getNearestAirports = () => {
            console.log(nearestDepartureAirports, nearestArrivalAirports)
            if (nearestDepartureAirports !== nearestArrivalAirports && nearestArrivalAirports && nearestDepartureAirports) {
                const flightData = document.querySelector("#flightData");
                const dataTitle = document.querySelector("#dataTitle");
                const title = document.querySelector("#title");
                flightData.style.display = "none";
                dataTitle.style.display = "block";
                title.innerHTML = "Searching For Flights...";

                console.log(date);

                axios.get(BACKEND_ADDRESS + "/flights?date=" + date + "&dep=" + nearestDepartureAirports + "&arr=" + nearestArrivalAirports + "&direct=true", {
                    headers: {
                        'Authorization': `Basic ${localStorage.getItem('auth')}`
                    }
                }).then(response => {
                    console.log(response)
                    if (response['data'] !== '') {
                        setFlights(response['data']);
                    } else {
                        const flightTable = document.querySelector("#flightTable");
                        flightTable.innerHTML = "";
                        axios.get(BACKEND_ADDRESS + "/flights?date=" + date + "&dep=" + nearestDepartureAirports + "&arr=" + nearestArrivalAirports + "&direct=false", {
                            headers: {
                                'Authorization': `Basic ${localStorage.getItem('auth')}`
                            }
                        }).then(response => {
                            if (response['data'] !== '') {
                                setFlights(response['data']);
                            } else {
                                noFlights()
                            }
                        }).catch(error => {
                            noFlights();
                        });
                    }

                }).catch(error => {
                    noFlights();
                });
            }
        }

        getNearestAirports();

    }, [nearestArrivalAirports, nearestDepartureAirports, date]);

    return (
        <>
            <div className={flightStyles.padding}>
                <div className={flightStyles.wrapper}>
                    <div className={flightStyles.form_container}>
                        <div className={flightStyles.form_inner}>
                            <form id="findFlights" onSubmit={getFlights}>
                                <div className={`${flightStyles.field} ${flightStyles.col}`}>
                                    <input type="date" id="date" min={new Date().toISOString().split('T')[0]} value={date} onInput={updateDate}/>
                                </div>
                                {/*<div className={`${flightStyles.field} ${flightStyles.btn} ${flightStyles.col}`}>*/}
                                {/*    <div className={flightStyles.btn_layer}></div>*/}
                                {/*    <input id="formSubmit" type="submit" value="Find Flights"/>*/}
                                {/*</div>*/}
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
                                <th>Duration</th>
                                <th>Price</th>
                                </thead>
                                <tbody id="flightTable"></tbody>
                            </table>
                        </div>
                    </div>
                    <div id="destination" className={`${flightStyles.field} ${flightStyles.btn}`} style={{display: "none"}}>
                        <div className={flightStyles.btn_layer}></div>
                        <input id="confirm" type="submit" onClick={confirmFlights} value="Confirm Flights"/>
                    </div>
                    <input id="FLYING" type="submit" onClick={handleSubmitJourney} style={{display: "none"}}/>
                </div>
            </div>
        </>
    );
}

Flights.defaultProps = {
    nearestDepartureAirports: '',
    nearestArrivalAirports: ''
}

export default Flights;
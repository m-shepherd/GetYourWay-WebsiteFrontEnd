import flightStyles from'./Flights.module.css';
import './Flights.css'
import {getFlights, confirmFlights} from "./FlightsUtils";

const Flights = () => {
    return (
        <>
            <div className={flightStyles.padding}>
                <div className={flightStyles.wrapper}>
                    <div className={flightStyles.form_container}>
                        <div className={flightStyles.form_inner}>
                            <form id="findFlights" onSubmit={getFlights}>
                                <div className={flightStyles.field}>
                                    <input type="date" name="date" min={new Date().toISOString().split('T')[0]} placeholder="YYYY-MM-DD"/>
                                </div>
                                <div className={flightStyles.field}>
                                    <input type="text" name="departureAirport" placeholder="Departure Airport"/>
                                </div>
                                <div className={flightStyles.field}>
                                    <input type="text" name="arrivalAirport" placeholder="Arrival Airport"/>
                                </div>
                                <div className={`${flightStyles.field} ${flightStyles.btn}`}>
                                    <div className={flightStyles.btn_layer}></div>
                                    <input type="submit" value="Find Flights"/>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div id="dataTitle" className={flightStyles.title_text} style={{display: "none"}}>
                        <div className={flightStyles.title}>Flight Data</div>
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

export default Flights;
import axios from "axios";
import {BACKEND_ADDRESS} from "../configuration";
import {useEffect} from "react";

function NearestAirport({latitude, longitude, setNearestAirports}) {

    useEffect(() => {

        const parseResponseData = (response) => {
            const nearestAirports = []
            for (let airport of response['data']['data']) {
                nearestAirports.push(airport['iataCode']);
            }
            return nearestAirports[0];
        }

        const findNearestAirports = () => {
            if (latitude !== undefined && longitude !== undefined && latitude !== longitude) {
                axios.get(BACKEND_ADDRESS + '/flights/nearest?latitude=' + latitude + '&longitude=' + longitude, {
                    headers: {
                        'Authorization': `Basic ${localStorage.getItem('auth')}`
                    }
                }).then(response => {
                    setNearestAirports(parseResponseData(response));
                }).catch(error => {
                    console.log('Could not fetch nearest airport data');
                    console.error(error);
                });
            }
        }

        findNearestAirports();

    }, [latitude, longitude]);

    return null;
}

export default NearestAirport
import {useEffect, useState} from 'react';
import PropTypes from "prop-types";
import axios from 'axios';
import weatherStyle from'./Weather.module.css';
import {BACKEND_ADDRESS, LATITUDE, LONGITUDE} from '../configuration';

const Weather = ({latitude, longitude}) => {
    const [currentWeather, setCurrentWeather] = useState({});
    const [weatherSymbolURL, setWeatherSymbolURL] = useState('');

    useEffect(() => {
        const parseResponseData = (response) => {
            return {
                temp: Math.round(response['temp']),
                symbol: response['weather'][0]['main'],
                description: capitalizeDescription(response['weather'][0]['description'])
            };
        };

        const getWeather = (() => {
            axios.get(BACKEND_ADDRESS + '/currentWeather?lat=' + latitude + '&lon=' + longitude, {
                headers: {
                    'Authorization': `Basic ${localStorage.getItem('auth')}`
                }
            }).then(response => {
                setCurrentWeather(parseResponseData(response.data.current));
            }).catch(error => {
                console.log('Could not fetch weather data');
                console.error(error);
            });
        })

        getWeather();
    }, [latitude, longitude]);

    useEffect(() => {
        const requestWeatherSymbol = () => {
            axios.get(BACKEND_ADDRESS + '/getWeatherSymbolURL?description=' + currentWeather.description, {
                headers: {
                    'Authorization': `Basic ${localStorage.getItem('auth')}`
                }
            }).then(response => {
                setWeatherSymbolURL(response.data);
            }).catch(error => {
                console.log('Could not fetch current weather symbol');
            });
        };

        requestWeatherSymbol();
    }, [currentWeather]);

    const capitalizeDescription = (description) => {
        return description[0].toUpperCase() + description.substring(1);
    }

    return (
        <>
            <div className={weatherStyle.padding}>
                <div className={weatherStyle.wrapper}>
                    <div className={weatherStyle.weatherContainer}>
                        <div className={weatherStyle.informationBlock}>
                            <p id="location" className={weatherStyle.largeInformationText}>Location</p>
                            <h2 id="temperature" className={weatherStyle.temperature}>{currentWeather.temp}&#176;C</h2>
                        </div>
                        <div className={weatherStyle.informationBlock}>
                            <img src={weatherSymbolURL} alt="Weather" className={weatherStyle.temperature}/>
                            <p className="smallInformationText">{currentWeather.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

Weather.propTypes = {
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired
}

Weather.defaultProps = {
    latitude: LATITUDE,
    longitude: LONGITUDE
}

export default Weather;
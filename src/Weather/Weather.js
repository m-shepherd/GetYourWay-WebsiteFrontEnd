import {useEffect, useState} from 'react';
import PropTypes from "prop-types";
import axios from 'axios';
import weatherStyle from'./Weather.module.css';
import {BACKEND_ADDRESS, LATITUDE, LONGITUDE} from '../configuration';

const Weather = ({latitude, longitude, startName, destinationName}) => {
    const [currentWeather, setCurrentWeather] = useState({ temp: 0, symbolUrl: "https://openweathermap.org/img/wn/02d@2x.png", description: 'scattered clouds'});
    const [hourlyWeather, setHourlyWeather] = useState([]);
    const [dailyWeather, setDailyWeather] = useState([]);
    const [weatherSymbolURL, setWeatherSymbolURL] = useState("https://openweathermap.org/img/wn/02d@2x.png");
    const [expanded, setExpanded] = useState(false);
    const [storedWeatherSymbols, setStoredWeatherSymbols] = useState({});

    const DAYS_OF_WEEK = ['SUN', 'MON', 'TUE', 'WED', 'THU', "FRI", "SAT"];

    useEffect(() => {
        const parseCurrentWeatherData = (response) => {
            return convertToWeatherObject(response);
        };

        const parseHourlyWeatherData = (response) => {
            let hourlyData = [];
            for(const item of response) {
                const hour = getTimeInReadableFormat(item['dt']).substring(0, 2);
                const weatherObject = convertToWeatherObject(item);
                weatherObject['hour'] = hour;
                hourlyData.push(weatherObject);
            }
            return hourlyData;
        }

        const parseDailyWeatherData = (response) => {
            let dailyData = [];
            for(const item of response) {
                const day = getDayInReadableFormat(item['dt']);
                const dayObject = {
                    day: day,
                    minTemp: Math.round(item.temp.min),
                    maxTemp: Math.round(item.temp.max),
                    description: capitalizeDescription(item['weather'][0]['description'])
                };
                dailyData.push(dayObject);
            }
            return dailyData;
        };

        const getTimeInReadableFormat = (time) => {
            const millis = time * 1000;
            const dateObject = new Date(millis);
            return dateObject.toLocaleTimeString();
        }

        const getDayInReadableFormat = (time) => {
            const millis = time * 1000;
            const dateObject = new Date(millis);
            return DAYS_OF_WEEK[dateObject.getDay()];
        }

        const convertToWeatherObject = (objectToConvert) => {
            return {
                temp: Math.round(objectToConvert['temp']),
                description: capitalizeDescription(objectToConvert['weather'][0]['description'])
            };
        }

        const setWeatherSymbolForCurrentWeather = (parsedData) => {
            axios.get(BACKEND_ADDRESS + '/getWeatherSymbolURL?description=' + currentWeather.description, {
                headers: {
                    'Authorization': `Basic ${localStorage.getItem('auth')}`
                }
            }).then(response => {
                let data = parsedData;
                data['symbolUrl'] = response.data;
                if(!storedWeatherSymbols.hasOwnProperty(currentWeather.description)) {
                    let tempSymbols = storedWeatherSymbols;
                    tempSymbols[currentWeather.description] = response.data;
                    setStoredWeatherSymbols(tempSymbols);
                }
                setCurrentWeather(data);
            }).catch(error => {
                console.log('Could not fetch current weather symbol');
            });
        };

        const setWeatherSymbolsForWeatherArray = async (parsedData, setterFunc) => {
            let data = parsedData;
            for (let item of data) {
                if (storedWeatherSymbols.hasOwnProperty(item.description)) {
                    item['symbolUrl'] = storedWeatherSymbols[item.description];
                } else {
                    await axios.get(BACKEND_ADDRESS + '/getWeatherSymbolURL?description=' + item.description, {
                        headers: {
                            'Authorization': `Basic ${localStorage.getItem('auth')}`
                        }
                    }).then(response => {
                        item['symbolUrl'] = response.data;
                        let tempSymbols = storedWeatherSymbols;
                        tempSymbols[item.description] = response.data;
                        setStoredWeatherSymbols(tempSymbols);
                    }).catch(error => {
                        console.log('Could not fetch weather symbols for hourly weather');
                    })
                }
            }
            setterFunc(data);
        }

        const getWeather = ((endpointName) => {
            axios.get(BACKEND_ADDRESS + '/' + endpointName + '?lat=' + latitude + '&lon=' + longitude, {
                headers: {
                    'Authorization': `Basic ${localStorage.getItem('auth')}`
                }
            }).then(response => {
                if (endpointName === 'currentWeather') {
                    if (response.data.current) {
                        let parsedData = parseCurrentWeatherData(response.data.current);
                        setWeatherSymbolForCurrentWeather(parsedData);
                        
                    }
                } else if (endpointName === 'hourlyWeather') {
                    if (response.data.hourly) {
                        let parsedData = parseHourlyWeatherData(response.data.hourly);
                        setWeatherSymbolsForWeatherArray(parsedData, setHourlyWeather);
                    }
                } else if (endpointName === 'dailyWeather') {
                    if(response.data.daily) {
                        let parsedData = parseDailyWeatherData(response.data.daily);
                        setWeatherSymbolsForWeatherArray(parsedData, setDailyWeather);
                    }
                }
            }).catch(error => {
                console.log('Could not fetch weather data');
                console.error(error);
            });
        })

        getWeather('currentWeather');
        getWeather('hourlyWeather');
        getWeather('dailyWeather');
    }, [latitude, longitude]);

    const capitalizeDescription = (description) => {
        return description[0].toUpperCase() + description.substring(1);
    }

    const weatherSelected = () => {
        setExpanded(!expanded);
    }

    const getFormattedHour = (hour) => {
        return hour + ':00';
    }

    return (
        <>
            <div className={weatherStyle.padding + ' ' + (expanded ? weatherStyle.expandedHeight : weatherStyle.standardHeight)}>
                <div className={weatherStyle.wrapper + ' ' + (expanded ? weatherStyle.expandedHeight : weatherStyle.standardHeight)}>
                    <div className={weatherStyle.weatherContainer}>
                        <div onClick={weatherSelected} className={weatherStyle.expandButton}>
                            <i className={weatherStyle.arrow + ' ' + (expanded ? weatherStyle.up : weatherStyle.down)}></i>
                        </div>
                        <div className={weatherStyle.informationBlock}>
                            <p id="location" className={weatherStyle.largeInformationText}>{!destinationName ? startName : destinationName}</p>
                            <h2 id="temperature" className={weatherStyle.temperature}>{currentWeather.temp}&#176;C</h2>
                        </div>
                        <div className={weatherStyle.informationBlock}>
                            <img src={currentWeather.symbolUrl} alt="Weather" className={weatherStyle.temperature}/>
                            <p className="smallInformationText">{currentWeather.description}</p>
                        </div>
                    </div>
                    <div className={weatherStyle.weatherContainer + ' ' + weatherStyle.expandedWeatherRow}>
                        <h3 className={weatherStyle.subheading}>Hourly Forecast:</h3>
                        <div className={weatherStyle.weatherListRow}>
                            { hourlyWeather.length >= 1 && hourlyWeather.map((weatherData, index) => {
                                return <div className={weatherStyle.informationBlock + ' ' + weatherStyle.hourlyWeatherBlock} key={index}>
                                    <p id="hour">{getFormattedHour(weatherData.hour)}</p>
                                    <img src={weatherData.symbolUrl} alt="Hourly Weather" className={weatherStyle.smallWeatherImage}/>
                                    <p id="temperature">{weatherData.temp}&#176;C</p>
                                </div>
                            })
                            }
                        </div>
                    </div>
                    <div className={weatherStyle.weatherContainer + ' ' + weatherStyle.expandedWeatherRow}>
                        <h3 className={weatherStyle.subheading}>Daily Forecast:</h3>
                        <div className={weatherStyle.weatherRowFill}>
                            { dailyWeather.length >= 1 && dailyWeather.map((weatherData, index) => {
                                return <div className={weatherStyle.informationBlock + ' ' + weatherStyle.hourlyWeatherBlock} key={index}>
                                    <p id="day">{weatherData.day}</p>
                                    <img src={weatherData.symbolUrl} alt="Daily Weather" className={weatherStyle.smallWeatherImage} />
                                    <p id="temperature">{weatherData.minTemp}&#176;-{weatherData.maxTemp}&#176;</p>
                                </div>
                            })
                            }
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
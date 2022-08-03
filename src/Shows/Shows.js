import showStyles from './Shows.module.css';
import Carousel from 'react-bootstrap/Carousel';
import { useState, useEffect } from 'react';
import { BACKEND_ADDRESS } from '../configuration';
import axios from 'axios';

const Shows = ({ setStartMarkerPos, setEndMarkerPos, setLatitude, setLongitude, showDirections, setShowDirections, startMarkerPos, endMarkerPos, setDirections, setDestinationName }) => {
    const [showList, setShowList] = useState([]);
    const [mapInformation, setMapInformation] = useState({});
    const [loadingRoutes, setLoadingRoutes] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);

    useEffect(() => {
        const getShowData = () => {
            let shows = [];
            axios.get(BACKEND_ADDRESS + '/shows', { 
                headers: {
                    'Authorization': `Basic ${localStorage.getItem('auth')}`
                }
            }).then(response => {
                if (response.data) {
                    for (const show of response.data) {
                        shows.push(show);
                    }

                    setShowList(shows);
                }
            }).catch(error => {
                console.error('Could not load show information');
                console.error(error);
            });
        }

        getShowData();
    }, []);

    useEffect(() => {
        if (Object.keys(mapInformation).length !== 0) {
            const destLatitude = showList[mapInformation.selectedIndex].showLocationLatitude;
            const destLongitude = showList[mapInformation.selectedIndex].showLocationLongitude;
            setEndMarkerPos({lat: destLatitude, lng: destLongitude});
            setLatitude(destLatitude);
            setLongitude(destLongitude);
            setDestinationName(showList[mapInformation.selectedIndex].showLocationName);
        }   
    }, [startMarkerPos]);

    useEffect(() => {
        if (Object.keys(mapInformation).length !== 0) {
            setShowDirections(true);
            setMapInformation({});
        }
    }, [endMarkerPos]);

    useEffect(() => {
        if(loadingRoutes && showDirections) {
            setLoadingRoutes(false);
        }
        else if (!showDirections && loadingRoutes) {
            getGeolocation();
        }
    }, [showDirections])

    useEffect(() => {
        if (Object.keys(mapInformation).length !== 0) {
            setStartMarkerPos({lat: mapInformation.lat, lng: mapInformation.lng});
        }
    }, [mapInformation]);

    useEffect(() => {
        if(loadingRoutes) {
            if (showDirections) {
                setShowDirections(false);
                setDirections(null);
            }else {
                getGeolocation();
            }
        }
    }, [loadingRoutes]);

    useEffect(() => {
        if (selectedIndex != -1) {
            setLoadingRoutes(true);
        }
    }, [selectedIndex])

    const getGeolocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                setMapInformation({lat: latitude, lng: longitude, selectedIndex: selectedIndex});
            });
        } else {
            console.log('Geolocation not enabled, cannot provide accurate starting position');
        }
    }

    const handleClick = (selection) => {
        setSelectedIndex(selection);
    }

    return (
    <div className={showStyles.container} interval={2000}>
        <Carousel className={showStyles.carouselContainer} fade>
            { showList.map((show, index) => {
            return <Carousel.Item key={index} onClick={() => handleClick(index)}>
                <img src={require('../resources/' + show.showName.replaceAll(" ", "") + '.jpeg')} className={showStyles.carouselImage} alt={show.showName} />
                <Carousel.Caption>
                    {loadingRoutes &&
                        <h3>Loading route Information....</h3>
                    }
                    {!loadingRoutes &&
                    <div>
                        <h3>{show.showName}</h3>
                        <p>Click to visit: {show.showLocationName}</p>   
                    </div>
                    }
                </Carousel.Caption>
            </Carousel.Item>
            })
            }
        </Carousel>
    </div>);
};

export default Shows;
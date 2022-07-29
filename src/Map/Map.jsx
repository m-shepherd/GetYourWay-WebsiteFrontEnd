import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import mapStyles from './Map.module.css';

const libraries=["places","directions","geocoder"]

const containerStyle = {
    width: '400px',
    height: '400px'
  };

export default function Map() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'AIzaSyCodtVa1E5fxA5mM3Pd-wiZoPH3uwyreMI',
        libraries
    });

    if (!isLoaded) return <div>Loading...</div>

    return (
        <>
            <div className={mapStyles.wrapper}>
                <GoogleMap
                    zoom={16}
                    center={{lat: 53.78986162692554, lng: -1.5330532190720971}}
                    mapContainerStyle={containerStyle}>
                </GoogleMap>
            </div>
        </>

    )

}
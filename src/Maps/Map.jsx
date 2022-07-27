import { GoogleMap, useLoadScript } from '@react-google-maps/api';

const libraries=["places","directions","geocoder"]

export default function Map() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'AIzaSyCodtVa1E5fxA5mM3Pd-wiZoPH3uwyreMI',
        libraries
    });

    if (!isLoaded) return <div>Loading...</div>

    return (
        <GoogleMap
            zoom={16}
            center={{lat: 53.78986162692554, lng: -1.5330532190720971}}
            mapContainerClassName='map-container'>
        </GoogleMap>
    )
}
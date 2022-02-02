import { useState }  from 'react';

import useGoogleMaps from "../useGoogleMaps";

export default function () {                           

    const { loading: loadingAPI } = useGoogleMaps(onLoad);                         

  
    const initialPlaceDetails = {
        loading: false,
        results: null,
        error: null,
    }
    const [ placeDetails, setPlaceDetails ] = useState(initialPlaceDetails);


    function onLoad(){   
        window.placesService = new window.google.maps.places.PlacesService();     
    }

    function getPlaceDetails(placeId, onSuccess, onError){
        setPlaceDetails({
            ...initialPlaceDetails,
            loading: true,
        });
        window.placesService.getDetails({
            placeId,
            fields: ['name', 'formatted_address', 'place_id', 'geometry'],
        }, (results, status) => {
            if (status === 'OK') {
                setPlaceDetails({
                    ...initialPlaceDetails,
                    results: results,
                });
                if(onSuccess){
                    onSuccess(results);
                }
            } else {
                setPlaceDetails({
                    ...initialPlaceDetails,
                    error: null,
                });
                if(onError){
                    onError();
                }
            }
        });
    }

    return {
        getPlaceDetails,
        placeDetails,
        loadingAPI,
    }
}


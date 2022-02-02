import { useState }  from 'react';

import useGoogleMaps from "../useGoogleMaps";

export default function () {                           

    const { loading: loadingAPI } = useGoogleMaps(onLoad);                         

  
    const initialAddress = {
        loading: false,
        results: [],
        error: null,
    }
    const [ address, setAddress ] = useState(initialAddress);

    const initialLocation = {
        loading: false,
        results: [],
        error: null,
    }
    const [ location, setLocation ] = useState(initialLocation);


    function onLoad(){   
        window.geoCoder = new window.google.maps.Geocoder;     
    }

    function locationToAddress(location, onSuccess, onError){
        setAddress({
            ...initialAddress,
            loading: true,
        });
        window.geoCoder.geocode({ location }, (results, status) => {
            if (status === 'OK') {
                setAddress({
                    ...initialAddress,
                    results: results,
                });
                if(onSuccess){
                    onSuccess(results);
                }
            } else {
                setAddress({
                    ...initialAddress,
                    error: null,
                });
                if(onError){
                    onError();
                }
            }
        });
    }

    function addressToLocation(address, onSuccess, onError){
        setLocation({
            ...initialLocation,
            loading: true,
        });
        window.geoCoder.geocode({ address }, (results, status) => {
            if (status === 'OK') {
                setLocation({
                    ...initialAddress,
                    results: results,
                });
                if(onSuccess){
                    onSuccess(results);
                }
            } else {
                setLocation({
                    ...initialAddress,
                    error: null,
                });
                if(onError){
                    onError();
                }
            }
        });
    }

    return {
        addressToLocation,
        locationToAddress,
        loadingAPI,
        address,
        location
    }
}


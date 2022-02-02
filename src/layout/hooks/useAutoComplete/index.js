import { useState }  from 'react';

import useGoogleMaps from "../useGoogleMaps";

export default function (onAPILoaded) {                           

    const { loading: loadingAPI } = useGoogleMaps(onLoad);                         

  
    const initialAutoComplete = {
        loading: false,
        results: null,
        error: null,
    }
    const [ autoComplete, setAutoComplete ] = useState(initialAutoComplete);


    function onLoad(){   
        window.autocompleteService = new window.google.maps.places.AutocompleteService();     
        if(onAPILoaded){
            onAPILoaded();
        }
    }

    function getPredictions(input, onSuccess, onError){
        setAutoComplete({
            ...initialAutoComplete,
            loading: true,
        });
        window.autocompleteService.getPlacePredictions({ input: input }, (results, status) => {
            if (status === 'OK') {
                setAutoComplete({
                    ...initialAutoComplete,
                    results: results,
                });
                if(onSuccess){
                    onSuccess(results);
                }
            } else {
                setAutoComplete({
                    ...initialAutoComplete,
                    error: null,
                });
                if(onError){
                    onError();
                }
            }
        });
    }

    return {
        getPredictions,
        autoComplete,
        loadingAPI,
    }
}


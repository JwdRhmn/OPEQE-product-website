import { useState, useEffect, }  from 'react';

import { googleMapsAPIKey } from "../../../config/api";

export default function (userOnLoad) {                           

    const initialState = {
        called: false,
        loading: true,
        error: null,
    }
    const [ state, setState ] = useState(initialState);
  

    useEffect(() => {
        if(state.called){
            return;
        }

        if(window.google && window.google.maps){
            setState({
                ...state,
                loading: false,
                called: true,
            });
            onLoad();
        }else{
            setState({
                ...state,
                loading: true,
                called: true,
            });     
            appendScript();
        }
    }, [window.google && window.google.maps]);

    function appendScript(){
        if(document.getElementById('googleMapsAPI')){            
            return;
        }
        const script = document.createElement('script');
        script.id = "googleMapsAPI";
        script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsAPIKey}&libraries=places`;
        window.document.body.appendChild(script);
        script.addEventListener('load', onLoad);
        script.addEventListener('error', onError);
    }

    function onLoad(){
        setState({
            ...state,
            loading: false,
        });
        if(userOnLoad){        
            userOnLoad();
        }
    }

    function onError(e){
        document.body.removeChild(e.target);
        setTimeout(() => appendScript(), 5000)
    }

    return {
        loading: state.loading,
    }
}


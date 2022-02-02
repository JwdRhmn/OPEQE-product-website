import { useState } from 'react';

const errorCodes = {
  notSupported: 400,     // not supported
  permission: 403,       // permission denied
  general: 500,          // general error occured 
}


export default function() {
    const initialState = {
      loading: false,
      error: null,
      coords: {},
    }
    const [ state, setState ] = useState(initialState); 

    function success(position, onSuccess) {
      const coords = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
      
      setState(prevState => ({
        ...prevState,
        loading: initialState.loading,
        error: initialState.error,
        coords,
      }));

      if(onSuccess){
        onSuccess(coords);
      } 
    }

    function error(data, onError) {
      const erorCode = data.code === 1 ?
          errorCodes.permission
        :
          errorCodes.general;

      setState(prevState => ({
        ...prevState,
        error: erorCode,  
        loading: initialState.loading,
        coords: initialState.coords,
      }));

      if(onError){
        onError(erorCode);
      } 
    }

    function locate(onSuccess, onError){
      if (!navigator.geolocation) {
        setState({
          ...state,
          error: errorCodes.notSupported, 
          loading: initialState.loading,
          coords: initialState.coords,
        });
      } else {
        setState({
          ...state,
          loading: true,
        });
        navigator.geolocation.getCurrentPosition(
          position => success(position, onSuccess), 
          data => error(data, onError)
        );
      }
    }

    return {
      coords: state.coords,
      loading: state.loading,
      error: state.error,
      locate,
    };

}
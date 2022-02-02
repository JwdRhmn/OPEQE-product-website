import useGeoCode from "../useGeoCode";
import useGeoLocation from "../useGeoLocation";

export default function () {                           

    const {
        loadingAPI,
        locationToAddress,
        address: {
            loading: addressLoading,
            results: addresses,
            error: addressError,
        },
    } = useGeoCode();                       

  
    const { 
      loading: locateLoading,
      locate,
      coords,
      error: locateError,
    } = useGeoLocation();

    
    function getAddresses(onSuccess, onFailure){
        if(loadingAPI){
            return;
        }
        locate(locateSuccess(onSuccess, onFailure), locateFailure(onFailure));
    }



    const locateSuccess = (onSuccess, onFailure) => coords => {
        console.log('located', coords);
        locationToAddress(coords, geocodeSuccess(onSuccess), geocodeFailure(onFailure));
    }
    const locateFailure = callBack => error => {
        console.log('locate err', error);
        if(callBack){
            callBack(error);
        }
    }

    const geocodeSuccess = callBack => addresses => {
        console.log('success', addresses);
        if(callBack){
            callBack(addresses);
        }
    }
    const geocodeFailure = callBack => error => {
        console.log('geocode err', error);
        if(callBack){
            callBack(error);
        }
    }

    return {
        addresses,
        getAddresses,
        loadingAPI,
        loading: addressLoading || locateLoading,
        error: addressError || locateError,
    }

}


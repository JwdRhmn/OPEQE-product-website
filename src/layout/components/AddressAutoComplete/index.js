import React, { useState } from 'react';
import cn from "classnames";

import LocationOnIcon from '@material-ui/icons/LocationOn';
import CircularProgress from '@material-ui/core/CircularProgress';

import AutoCompleteInput from "../AutoCompleteInput";

import useAutoComplete from "../../hooks/useAutoComplete";
import useGeoCode from "../../hooks/useGeoCode";


export default function(props) {
    const {  
        className, 
        style,
        onSelect,
        placeholder,
        loading,
        onData,
        noData,
        ...others
    } = props;
  
    const [ predictions, setPredictions ] = useState([]);

    const { 
      getPredictions, 
    } = useAutoComplete();
    

    const {
      addressToLocation,
      location: {
        loading: locationLoading,
      },
      loadingAPI,
    } = useGeoCode();

    function applyPredictions(newPredictions){
      const predictionsArray = newPredictions.map( prediction => {
        return {
          text: prediction.description,
          key: prediction.place_id,
        };
      });
      setPredictions(predictionsArray);
    }

    function onUserType(input){
      if(!input || loadingAPI){
        return;
      }

      getPredictions(input, applyPredictions);
    }


    function onUserSelect(selection){
      if(!selection){
        return;
      }
      if(!noData){
        addressToLocation(selection.text, onData);
      }
      if(onSelect){
        onSelect(selection);
      }      
    }

    return (
      <AutoCompleteInput 
          className={cn(
            "address-auto-complete-l1",
            className
          )}
          listContainerClassName="list"
          itemClassName="item"
          placeholder={placeholder}
          ItemIcon={<LocationOnIcon />}
          suggestions={predictions}
          AdornmentIcon={(loading || locationLoading) ? <CircularProgress /> : <LocationOnIcon />}
          onSelect={onUserSelect}
          onInputValueChange={onUserType}
          itemToString={item => (item ? item.text : '')}
          {...others}
      />  
    );
}


import { useState } from 'react';

import useAsync from "../useAsync";
import getDistanceAPI from "../../../api/maps/getDistance";

export default function() {

    const {
        handle: asyncHandle,
        state: asyncState,
    } = useAsync();

    const getDistance = (params, onSuccess, onFailure) => {
        const promise = asyncHandle(getDistanceAPI(params), data => {            
            if(onSuccess){
                onSuccess(data);
            }
        }, error => {            
            if(onFailure){
                onFailure(error);
            }
        });

        return promise;
    }

    return {
      ...asyncState,
      getDistance,
    };

}
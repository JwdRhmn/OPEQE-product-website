import produce from "immer";

import dataFetchStatusReducer, { initialFetchStatus } from "../helpers/dataFetchStatus";
import {
    CANCEL_RESERVE,
    DATA_FETCH_FULFILLED,
} from "../../config/actionNames/";

export const initialState = {
    status: initialFetchStatus,
    data: {},
}

export default (state=initialState, action) => { 

	const { 
        status 
    } = state;

	const cancelReserveStatus = dataFetchStatusReducer(status, action, CANCEL_RESERVE);

    return produce(state, finalState => {
        finalState.status = cancelReserveStatus;

        const { type, payload } = action;

        switch(type){
            case `${CANCEL_RESERVE}${DATA_FETCH_FULFILLED}`: {
                finalState.data = payload;
                break;
            }
        }   

        return finalState;
    })    
};


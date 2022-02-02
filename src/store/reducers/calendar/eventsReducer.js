import produce from "immer";

import dataFetchStatusReducer, { initialFetchStatus } from "../helpers/dataFetchStatus";
import {
    FETCH_CALENDAR_EVENTS,
    DATA_FETCH_FULFILLED,
} from "../../config/actionNames/";

export const initialState = {
    status: initialFetchStatus,
    list: [],
}

export default (state=initialState, action) => { 

	const { 
        status 
    } = state;

	const eventsFetchStatus = dataFetchStatusReducer(status, action, FETCH_CALENDAR_EVENTS);

    return produce(state, finalState => {
        finalState.status = eventsFetchStatus;

        const { type, payload } = action;

		switch(type){
			case `${FETCH_CALENDAR_EVENTS}${DATA_FETCH_FULFILLED}` :{
				finalState.list = payload;
				break;
			}		
		}	

        return finalState;
    })    
};


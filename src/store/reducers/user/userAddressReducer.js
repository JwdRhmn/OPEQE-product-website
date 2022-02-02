import produce from 'immer';

import {
	SET_USER_DEFAULT_ADDRESS,	
	FETCH_USER_ADDRESS,
	DATA_FETCH_PENDING,
	DATA_FETCH_FULFILLED,
} from "../../config/actionNames";

import dataFetchStatusReducer ,{ initialFetchStatus } from "../helpers/dataFetchStatus";

export const initialState = {
	get:{
		status: initialFetchStatus,
		list: [],
	},
	set:{
		status: initialFetchStatus,
	}
}


export default (state=initialState, action) => { 

	const { 
        get: {
        	status: getStatus,
        },
        set: {
        	status: setStatus,
        }
    } = state;

	const addressFetchStatus = dataFetchStatusReducer(getStatus, action, FETCH_USER_ADDRESS);
	const addressSetStatus = dataFetchStatusReducer(setStatus, action, SET_USER_DEFAULT_ADDRESS);

	return produce(state, finalState => {
        finalState.get.status = addressFetchStatus;
        finalState.set.status = addressSetStatus;
        
        const { type, payload, meta } = action;
	
		switch(type){
			// FETCH ADDRESS
			case `${FETCH_USER_ADDRESS}${DATA_FETCH_FULFILLED}` :{
				if(payload[0]){
					finalState.get.list = [ payload[0] ];
				}
				break;
			}
			// SET ADDRESS
			case `${SET_USER_DEFAULT_ADDRESS}${DATA_FETCH_PENDING}` : {
				finalState.get.list = [ meta ];
				break;
			}
			// GUEST USER
			case SET_USER_DEFAULT_ADDRESS : {
				finalState.get.list = [ payload ];
				break;
			}
			default: {
				break;
			}
		}

		return finalState;
    })    

}
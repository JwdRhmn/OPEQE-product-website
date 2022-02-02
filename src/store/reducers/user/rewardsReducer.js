import produce from 'immer';

import {
	DATA_FETCH_FULFILLED,
	FETCH_USER_REWARDS,
} from "../../config/actionNames";

import dataFetchStatusReducer ,{ initialFetchStatus } from "../helpers/dataFetchStatus";

export const initialState = {
	status: initialFetchStatus,
	list: [],
}


export default (state=initialState, action) => { 

	const { 
        status,
    } = state;

	const rewardsFetchStatus = dataFetchStatusReducer(status, action, FETCH_USER_REWARDS);

	return produce(state, finalState => {
        finalState.status = rewardsFetchStatus;
        
        const { type, payload } = action;
	
		switch(type){
			// FETCH REWARDS
			case `${FETCH_USER_REWARDS}${DATA_FETCH_FULFILLED}` :{
				finalState.list = payload;
				break;
			}			
			default: {
				break;
			}
		}

		return finalState;
    })    

}
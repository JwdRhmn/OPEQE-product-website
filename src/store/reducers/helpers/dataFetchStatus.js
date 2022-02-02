import produce from 'immer';

import {
	DATA_FETCH_PENDING,
	DATA_FETCH_FULFILLED,
	DATA_FETCH_REJECTED,
} from "../../config/actionNames";

export const initialFetchStatus = {
	[DATA_FETCH_FULFILLED]: false,
	[DATA_FETCH_REJECTED]: false,
	[DATA_FETCH_PENDING]: false,
};

export default produce((state=initialFetchStatus, action, baseType) => { 
	const { type, payload } = action;

	switch(type){
		case `${baseType}${DATA_FETCH_PENDING}` :{
			state[DATA_FETCH_PENDING] = true;
			state[DATA_FETCH_REJECTED] = false;
			break;
		}
		case `${baseType}${DATA_FETCH_FULFILLED}` :{
			state[DATA_FETCH_PENDING] = false;
			state[DATA_FETCH_REJECTED] = false;
			state[DATA_FETCH_FULFILLED] = true;
			break;
		}
		case `${baseType}${DATA_FETCH_REJECTED}` :{
			state[DATA_FETCH_PENDING] = false;
			state[DATA_FETCH_REJECTED] = true;
			break;
		}
	}	
});



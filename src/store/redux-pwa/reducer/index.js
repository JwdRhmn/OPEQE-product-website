import produce from 'immer';

import checkDelayed from "../funtions/checkDelayed";

import {
	ADD_TO_READY,
	REMOVE_FROM_READY,
	ADD_TO_PENDING,
	REMOVE_FROM_PENDING,
	ADD_TO_DELAYED,
	REMOVE_FROM_DELAYED,
	SET_STATUS_ON,
	SET_STATUS_OFF,
	SET_NEEDS_CHECK,
	INCREMENT_REQUEST_TRY,
	APP_STARTED,
	APP_CLOSED,
	SET_REQUEST_FULFILLED
} from "../config";


export default produce((state, action) => {
	const { type, payload } = action;

	switch(type){
		case `${ADD_TO_READY}`: {
			state.ready[payload.key] = payload; 
			state.needsCheck = true;
			break;
		}
		case `${REMOVE_FROM_READY}`: {
			delete state.ready[payload];
			break;
		}
		case `${ADD_TO_PENDING}`: {
			state.pending[payload] = payload; 
			break;
		}
		case `${REMOVE_FROM_PENDING}`: {
			delete state.pending[payload];
			break;
		}
		case `${ADD_TO_DELAYED}`: {
			state.delayed[payload.key] = payload;
			break;
		}
		case `${REMOVE_FROM_DELAYED}`: {
			delete state.delayed[payload];
			break;
		}
		case `${SET_STATUS_ON}`: {
			state.online = true;
			state.needsCheck = true;
			break;
		}
		case `${SET_STATUS_OFF}`: {
			state.online = false;
			break;
		}
		case `${SET_NEEDS_CHECK}`: {
			state.needsCheck = payload;
			break;
		}
		case `${INCREMENT_REQUEST_TRY}`: {
			state.ready[payload].controls.tried ++;
			break;
		}
		case `${SET_REQUEST_FULFILLED}`: {
			// state.ready[payload].controls.fullfilled = true;
			// break;
		}
		case `${APP_STARTED}`: {
			checkDelayed(state.delayed, 'enter', delayedData => {
				delete state.delayed[delayedData.key];
				state.ready[delayedData.key] = delayedData.data; 
				state.needsCheck = true;
			});
			break;
		}
		case `${APP_CLOSED}`: {
			checkDelayed(state.delayed, 'exit', delayedData => {
				delete state.delayed[delayedData.key];
				state.ready[delayedData.key] = delayedData.data; 
				state.needsCheck = true;
			});
			break;
		}
	}	
},{
	ready: {},
	pending: {},
	online: true,
	needsCheck: false,
	delayed: {},
});

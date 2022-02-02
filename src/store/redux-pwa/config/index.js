export const REMOVE_FROM_READY = "REMOVE_FROM_READY";
export const ADD_TO_READY = "ADD_TO_READY";
export const ADD_TO_DELAYED = "ADD_TO_DELAYED";
export const REMOVE_FROM_DELAYED = "REMOVE_FROM_DELAYED";
export const REMOVE_FROM_PENDING = "REMOVE_FROM_PENDING";
export const ADD_TO_PENDING = "ADD_TO_PENDING";
export const INCREMENT_REQUEST_TRY = "INCREMENT_REQUEST_TRY";
export const SET_REQUEST_FULFILLED = "SET_REQUEST_FULFILLED";

export const SET_STATUS_ON = "SET_STATUS_ON";
export const SET_STATUS_OFF = "SET_STATUS_OFF";
export const APP_STARTED = "APP_STARTED";
export const APP_CLOSED = "APP_CLOSED";

export const SET_NEEDS_CHECK = "SET_NEEDS_CHECK";

export const AUTO_RETRY_INTERVAL = 10000;

export const STORE_DB_CONFIG = {
    //driver      : localforage.WEBSQL,
    name        : 'REDUX STORE',
    //version     : 2,
    //size        : 4980736,
    storeName   : 'main',
    description : 'App state'
}

export const validateStatus = status => {
	if(status === 200){
		return 'success';
	}
	if(status >= 500 || status < 400){
		return 'failure';
	}

	return 'discard';
}


export const checkIfNetworkError = error => {
	if(
		error.isAxiosError
	){
		return true;
	}
	return false;
}
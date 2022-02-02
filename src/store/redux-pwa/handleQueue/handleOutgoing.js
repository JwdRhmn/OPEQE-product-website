import axios from "axios";

import getStatus from "../getStatus/";
import addToPending from "../actions/addToPending";
import incrementTry from "../actions/incrementTry";
import removeFromPending from "../actions/removeFromPending";
import removeFromReady from "../actions/removeFromReady";
import { validateStatus, checkIfNetworkError } from "../config/";

const options = {
  validateStatus: status =>  {
  	return true;
  }
}

export default  ({
	ready, 
	pending,
	dispatch,
}) => {
	
	const isOn = getStatus();	

	const now = Date.now();

	for(const key in ready){

		if(pending[key]){
			continue;
		}

		const {
			url,
			method,
			headers,
			successActions,
			failureActions,
			pendingActions,
			body,
			controls,
			stamp
		} = ready[key];

		if(!isOn){			
			continue;
		}

		const controlResult = checkOptions({
			now, 
			dispatch, 
			key, 
			controls, 
			stamp
		})

		if(controlResult.stale){
			continue;
		}
		

		dispatchArray(dispatch, pendingActions);	
		dispatch( incrementTry(key) );


		const checker = onFulFill({
			dispatch, 
			key, 
			retry: !controlResult.isLastTry,
			successActions,
			failureActions,
		})

		dispatch(addToPending(key));

		options.headers = headers;
		options.method = method;
		options.data = body;
		options.url = url;

		axios(options).then(
			checker
		).catch(
			error => {				
				if(!checkIfNetworkError(error)){
				   throw new Error(error);
				}
				checker(error);
			}
		).then(
			onEnd(dispatch, key)
		);

	}

}


const checkOptions = ({
	now,
	dispatch,
	key,
	controls,
	stamp
}) => {
	const {
		tried,
		maxRetry,
		expire
	} = controls;

	const out = {
		isLastTry: false,
		stale: false,
	}

	if((tried - 1) >= maxRetry){
		dispatch(removeFromReady(key));
		out.stale = true;
	} else if(tried === maxRetry){
		out.isLastTry = true;
	}

	if(expire && (stamp + expire) <= now){
		dispatch(removeFromReady(key));
		out.stale = true;
	}



	return out;
}


const onFulFill = ({
	dispatch, 
	key, 
	retry,
	successActions, 
	failureActions,
}) => response => { 
	const {
		status,
	} = response;

	if(response.status){
		const validation = validateStatus(status);
		switch(validation){
			case 'success': {
				success(dispatch, key, response, successActions);
				break;
			}
			case 'failure': {
				failure(dispatch, key, response, failureActions);
				break;
			}
			default: {
				if(!retry){
					failure(dispatch, key, response, failureActions);
				}
				break;
			}
		}	
	} else {
		if(!retry){
			failure(dispatch, key, response, failureActions);
		}
	}
}


const success = (dispatch, key, response, successActions) => {
	dispatch(removeFromReady(key));
	dispatchArray(dispatch, successActions, response.data);
	//console.log(key, 'success');
}

const failure = (dispatch, key, error, failureActions) => {
	dispatch(removeFromReady(key));
	dispatchArray(dispatch, failureActions, error);
	//console.log(key, 'failure');
}


const onEnd = (dispatch, key) => () => {
	dispatch(removeFromPending(key));
	//console.log(key,'End');
}


const dispatchArray = ( dispatch, array, payload ) => {
	if(array){
		array.forEach( item => {
			dispatch({
				...item,
				payload,
			});
		});
	}
}
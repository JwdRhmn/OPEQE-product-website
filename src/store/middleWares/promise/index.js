
import produce from "immer";

import {
	DATA_FETCH_PENDING,
	DATA_FETCH_FULFILLED,
	DATA_FETCH_REJECTED,
}  from "../../config/actionNames/";


export default store => next => action => {	
	const { payload } = action;

	if(isPromise(payload)){
		handlePending(action)(next);

		payload.then(
			handleFulfill(action)(next),
			handleReject(action)(next),
		);
	} else{
		next(action);
	}
}

const handlePending = action => next => {
	const newAction = returnCopyOfAction(action, null, `${action.type}${DATA_FETCH_PENDING}`);
  	next(newAction);
}

const handleFulfill = action => next => data => {
  const { meta, type } = action;

  let promiseData;  
  if(data && meta && meta.dataField){
    promiseData = data[meta.dataField];
  } else {
    promiseData = data;
  }

	const newAction = returnCopyOfAction(action, promiseData, `${type}${DATA_FETCH_FULFILLED}`);
  	next(newAction);
}


const handleReject = action => next => error => {
	const newAction = returnCopyOfAction(action, error, `${action.type}${DATA_FETCH_REJECTED}`);
  	next(newAction);
}

function returnCopyOfAction(action, payload, type){
	return produce(action, draft => {
		draft.payload = payload;
		draft.type = type;
	});
}


function isPromise(value) {
  if (value !== null && typeof value === 'object') {
    return value && typeof value.then === 'function';
  }

  return false;
}
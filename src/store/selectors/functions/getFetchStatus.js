import {
	DATA_FETCH_PENDING,
	DATA_FETCH_REJECTED,
	DATA_FETCH_FULFILLED
} from "../../config/actionNames";

export default status => {
	const {
		[DATA_FETCH_PENDING]: pending,
		[DATA_FETCH_REJECTED]: error,
		[DATA_FETCH_FULFILLED]: fulfilled,
	} = status;

	if(pending){
		return 'pending';
	}
	
	if(!fulfilled && !error){
		return 'no-op';
	}


	if(error){
		return "failure";
	}

	return "success";
}
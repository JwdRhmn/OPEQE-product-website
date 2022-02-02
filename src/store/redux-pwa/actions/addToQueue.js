import addToReady from "./addToReady";
import addToDelayed from "./addToDelayed";

import {
	DATA_FETCH_PENDING,
	DATA_FETCH_FULFILLED,
	DATA_FETCH_REJECTED,
}  from "../../config/actionNames/";

export default (action, request, {
	retry,
	delay,
	maxRetry=5,
	expire,
} = {} ) => {	

	const { type, payload } = action;


	let typeArray = {
		pending: [],
		failure: [],
		success: [],
	};
	if(type && type.length){
		for(let i = 0; i < type.length; i++){
			typeArray.pending.push({
				type: `${type[i]}${DATA_FETCH_PENDING}`,
				meta: payload,
			})
			typeArray.failure.push({
				type: `${type[i]}${DATA_FETCH_REJECTED}`,
				meta: payload,
			})
			typeArray.success.push({
				type: `${type[i]}${DATA_FETCH_FULFILLED}`,
				meta: payload,
			})
		}
	}


	const {
		url,
		method,
		body,
		key,
		headers,
	} = request;

	const dataForQueue = {
		url: url,	
		key: key,
		method: method,
		successActions: typeArray.success,
		failureActions: typeArray.failure,
		pendingActions: typeArray.pending,
		headers: headers,
		body: body,
		controls: {
			maxRetry: retry ? maxRetry : 0,
			tried: 0,
			expire: expire * 1000,
			fullfilled: false,
		},
		stamp: Date.now(),
	}


	if(!delay){
		return addToReady(dataForQueue);
	} else {
		const {
			onEnter,
			onExit,
			timeout,
		} = delay;

		if(!onEnter && !onExit && !timeout){
			throw new Error("Delayed requests should have at least one trigger condition (onEnter, onExit or timeout)");
		}
		return addToDelayed({
			key: dataForQueue.key,
			data: dataForQueue,
			onEnter: onEnter,
			onExit: onExit,
			timeout: timeout * 1000,
			stamp: Date.now(),
		});
	}

}
import { useState, useEffect } from "react";


export default (onSuccess, onFailure, status) => {
	const [ listen, setListen ] = useState(false);

	useEffect(() => {
		if(status === 'pending'){
			setListen(true);
		} else if(listen) {
			setListen(false);
			if( status === 'success') {
				if(onSuccess){
					onSuccess();
				}
			} else {
				if(onFailure)
				{
					onFailure();
				}
			}
		}
	}, [ status ] );

}

export const statusCodes = {
	pending: 'pending',
	fulfilled: 'success',
	rejected: 'failure',
}
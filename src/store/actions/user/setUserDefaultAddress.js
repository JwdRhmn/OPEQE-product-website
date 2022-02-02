import axios from "axios";

import { SET_USER_DEFAULT_ADDRESS } from "../../config/actionNames";
import setUserDefaultAddress from "../../../api/user/setUserDefaultAddress";
import { addToQueue } from "../../redux-pwa";
import addAuth from "../helpers/addAuth";
import uuid from "../../../functions/uuid";
import getUserAuth from "../../selectors/user/getUserAuth";
import getAddressComponents from "../../../functions/getAddressComponents";
import getDistanceAPI from "../../../api/maps/getDistance";
import { storeLocation } from "../../config/store";


export default data => async (dispatch, getState) => {

	const state = getState();

	const token = getUserAuth(state);


	const addressData = await extractAddressData(data.address);

	const deliveryData = extractDeliveryData(data.delivery);

	const dataForAPI = {
		address: {
			appAddressId: uuid(),
	        title: 'Home', 
	        isDefault: true,
	        ...addressData,
	        ...deliveryData,
    	},
	}; 

	if(token){
		dispatch(
			addToQueue(
				{
					type: [ SET_USER_DEFAULT_ADDRESS ],
					payload: dataForAPI.address,
				},
				setUserDefaultAddress(
					addAuth(dataForAPI, state)
				)
			)
		);	
	} else {
		dispatch({
			type: SET_USER_DEFAULT_ADDRESS,
			payload: dataForAPI.address,
		});
	}	
}


async function extractAddressData(address){

	const {
        address_components,
        formatted_address,
        geometry: {
          location: {
            lat,
            lng
          }
        }
    } = address;

    const coords = {
    	lat: lat(),
    	lng: lng(),
    }

    const addressComponents = getAddressComponents(address_components);

	const extracted = {
		...addressComponents,
		alternateAddress: formatted_address,
		latitude: coords.lat,
        longitude: coords.lng,
        altitude: 0,
        distance: 0,
        floor: 0,
	}


	
	const distanceRequest = getDistanceAPI({
		origin: coords,
		dest: storeLocation,
	});

	try{
		const distanceData = await axios.request({
	        url: distanceRequest.url,
	        method: distanceRequest.method,
	        data: distanceRequest.body,
	        headers: distanceRequest.headers,
	    }); 

		const estimated = distanceData.data.rows[0].elements[0];
		const distance = estimated.distance.value;
		if(distance){
			extracted.distance = distance;
		}
		const duration = estimated.duration.value;
		if(duration){
			extracted.deliveryEstimate = duration;
		}
    } catch(err) {
    	
    } 



	return extracted;
}


function extractDeliveryData(delivery){ 

	const {
		mode,
		notes,
	} = delivery;

	const extracted = {
		unit: '',
        business: '',
		note: '',
        deliverToDoor: false,
        pickUpOutSide: false,
	}

	if(notes){
		extracted.unit = notes.apt;
        extracted.business = notes.business;
		extracted.note = notes.delivery;
	}

	if(mode === 'deliver'){
		extracted.deliverToDoor = true;
	} else {
		extracted.pickUpOutSide = true;
	}

	return extracted;
}
		

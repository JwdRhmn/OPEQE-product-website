import { ADD_USER_PAYMENT_METHOD } from "../../config/actionNames";
import addPaymentMethod from "../../../api/user/addPaymentMethod";
import { addToQueue } from "../../redux-pwa";
import addAuth from "../helpers/addAuth";
import uuid from "../../../functions/uuid";
import getAPIPaymentType from "./functions/getAPIPaymentType";

export default data => (dispatch, getState) => {
	
	const {
		address,
		card,			
	} = data;

	const id = uuid();
	const type = getAPIPaymentType( card.type );

	const dataForAPI = {
		id: id,
	    paymentType: type,
	    cardNumber: card.number,
	    ExpDate: card.date,
	    SecureNumber: card.cvv,
	    isActive: true,
	    isDefault: true,
	    date: new Date(), //?
	    unitNumber: address.apt, //?
	    streetAddress: address.components.street, //?
	    city: address.components.city,
	    state: address.components.stateCode,
	    zipCode: address.postal,
	    country: address.components.country,
	    countryCode: address.components.countryCode,
	    latitude: address.pos.lat,
	    longitude: address.pos.lng,
	    altitude: 0,
	}

	const dataForStore = {
		id: id,
		paymentType: type,
		cardNumber: `${"**** ".repeat(3)}${card.number.slice(-4)}`,
		expDate: card.date,
		unitNumber: address.apt, //?
	    streetAddress: address.components.street, //?
	    city: address.components.city,
	    state: address.components.stateCode,
	    zipCode: address.postal,
		isDefault: true,
	}

	dispatch(
		addToQueue(
			{
				type: [ ADD_USER_PAYMENT_METHOD ],
				payload: dataForStore,
			},
			addPaymentMethod(
				addAuth(dataForAPI, getState())
			)
		)
	);
}

// 
// var paymentId : UUID // generate
// var paymenType : String? // visa, master, ...
// var cardNumber : String? // num
// var ExpDate : String?
// var SecureNumber : String? // cvv
// var isActive : Bool? // true
// var isDefault : Bool? // true 
// var date : Date? // add date
// var streetAddress : String?
// var unitNumber : String?
// var city : String?
// var state : String?
// var zipCode : String?
// var country : String?
// var countryCode : String?
// var latitude : Double?
// var longitude : Double?
// var altitude : Double?
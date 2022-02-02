import { createSelector } from 'reselect';
import getStatus from "../functions/getFetchStatus";
import getUIPaymentType from "./functions/getUIPaymentType";

export default createSelector(
  	[ 
		state => state.user.paymentMethods.get,
  	],
	methods => transform(methods),
)




const transform = methods => {
    const list = transformList(methods.list);
    return  {
        list,
        status: getStatus(methods.status),
    };
}


const transformList = list => list.map( ({
	id,
    businessId,
    paymentType,
    cardNumber,
    expDate,
    streetAddress,
    unitNumber,
    city,
    state,
    zipCode,
    isDefault,
}) => {

	return {
		id,
	    businessId,
	    type: getUIPaymentType( paymentType ),
	    number: cardNumber,
	    expDate,
	    streetAddress,
	    unit: unitNumber,
	    city,
	    state,
	    zipCode,
	    isDefault,
	}
})

// 
// var id : UUID
// var businessId : UUID
// var paymenType : String
// var cardNumber : String
// var expDate : String
// var streetAddress : String
// var unitNumber : String
// var city : String
// var state : String
// var zipCode : String
// var isDefault : Bool
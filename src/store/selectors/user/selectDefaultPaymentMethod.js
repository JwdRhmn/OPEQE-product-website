import { createSelector } from 'reselect';
import getUIPaymentType from "./functions/getUIPaymentType";

export default createSelector(
  	[ 
		state => state.user.paymentMethods.get,
  	],
	methods => transform(methods),
)




const transform = methods => {
    const data = transformList(methods.list);
    return  data;
}


const transformList = list => {

    const defaultMethod = list.findIndex( item => item.isDefault );

    if(defaultMethod === -1){
        return null;
    }

    const {
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
    } = list[ defaultMethod ];

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
}

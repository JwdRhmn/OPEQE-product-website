import produce from "immer";

import deliveryConditionReducer from "./deliveryConditionReducer";
import userAddressReducer  from "./userAddressReducer";
import userInfoReducer  from "./userInfoReducer";
import paymentMethodsReducer  from "./paymentMethodsReducer";
import rewardsReducer  from "./rewardsReducer";
import editInfoReducer  from "./editInfoReducer";
import verifyEmailReducer  from "./verifyEmailReducer";
import referralReducer  from "./referralReducer";

const initialState = {};

export default (state=initialState, action) => {
	const {
		info,
		address,
		deliveryCondition,
		paymentMethods,
		rewards,
		editInfo,
		verifyEmail,
		referral,
	} = state;

	const userInfoReduced = userInfoReducer(info, action);	
	const addressReduced = userAddressReducer(address, action);	
	const deliveryConditionReduced = deliveryConditionReducer(deliveryCondition, action);
	const paymentMethodsReduced = paymentMethodsReducer(paymentMethods, action);
	const rewardsReduced = rewardsReducer(rewards, action);
	const editInfoReduced = editInfoReducer(editInfo, action);
	const verifyEmailReduced = verifyEmailReducer(verifyEmail, action);
	const referralReduced = referralReducer(referral, action);

	return produce(state, finalState => {
		finalState.info = userInfoReduced;
		finalState.address = addressReduced;
		finalState.deliveryCondition = deliveryConditionReduced;
		finalState.paymentMethods = paymentMethodsReduced;
		finalState.rewards = rewardsReduced;
		finalState.editInfo = editInfoReduced;
		finalState.verifyEmail = verifyEmailReduced;
		finalState.referral = referralReduced;
	})
}


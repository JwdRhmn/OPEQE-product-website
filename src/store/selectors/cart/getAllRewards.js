import getReward from "./getReward";

export default (rewards, fees, totalPrice, totalQuantity, totalPriceWithSpecials) => {
	const out = [];

	const reward = rewards[0];

	if(!reward){
		return out;
	}

	const discount = getReward(
		reward,
		fees,
		totalPrice,
		totalQuantity,
		totalPriceWithSpecials
	);

	if(discount){
		out.push( discount );
	}

	return out;
}
import mapTimePeriod from "./mapTimePeriod";

export default item => {
    const { subscription } = item;

    const {
        percentage,
        limit,
        title,
        description,
        policy,
		image,
		color,
		timePriod,
    } = subscription;

    let amount = 0
    if (percentage > 0) {
        amount = percentage;
    } else {
        amount = subscription.amount;
    }
    if (amount > limit && limit !== 0){
        amount = limit;
    }

    const timePeriodMapped = mapTimePeriod(timePriod);

    return {
		id: subscription.id,
		title,
		description,
		policy,
		image,
		color: `rgb(${color})`,
		timePeriod: timePeriodMapped,
		isPercent: percentage > 0,
		discount: amount
	}
}


const checkCond = (subscription, total, quantity) => {
    return (quantity >= subscription.quantity && subscription.quantity > 0) 
        || (total >= subscription.value && subscription.value > 0);
}
import getAllSpecials from "./getAllSpecials";
import getAllRewards from "./getAllRewards";
import getTotalSpecials from "./getTotalSpecials";
import getFees from "./getFees";
import getPreparationTime from "./getPreparationTime";
import getTax from "./getTax";

export default cart => {
	const totals =  cart.items.reduce( 
		(total, item) => {
			total.preparation += item.preparation;
			total.quantity += item.quantity;

			const optionPrice = (item.options ? item.options : item.option).reduce((total, option) => {
	            return total + option.price;
	        }, 0)

			total.price += item.quantity * (item.price + optionPrice);

			return total;
		}
	, {
		preparation: 0,
		price: 0,
		quantity: 0,		
	});

	const delivery = cart.delivery;

	const taxes = getTax(totals.price);
	const fees = getFees(delivery.fee, totals.quantity, totals.price).concat(taxes);

	const specials = getAllSpecials(cart.items);
	const totalSpecials = getTotalSpecials(specials);

	const specialsAppliedTotal = totals.price - totalSpecials;

	const rewards = getAllRewards(cart.rewards, fees, totals.price, totals.quantity, specialsAppliedTotal);

	const preparation = getPreparationTime(delivery.time, totals.preparation, totals.quantity)


	return {
		totals,
		fees,
		rewards,
		preparation,
		specials,
	}
}
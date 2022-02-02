import getDeliveryFee from "./getDeliveryFee";
import getServiceFee from "./getServiceFee";

export default (totalFee, totalQuantity, totalPrice) => {

	return [
		{
			title: "delivery",
			amount: getDeliveryFee(totalQuantity, totalFee)
		},
		{
			title: "service",
			amount: getServiceFee(totalPrice),
		}
	]
}
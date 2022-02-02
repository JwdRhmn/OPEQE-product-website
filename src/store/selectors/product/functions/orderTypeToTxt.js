import currencify from "../../../../functions/currencify";

export default (type, fee) => {
	switch (type) {
		case "pickup":
			return "Free Pickup";
		case "delivery":
			return parseFloat(fee) > 0
				? `Delivery ${currencify(fee)}`
				: "Free Delivery";
		case "reserve":
			return "Dine Wait Free";
	}
};
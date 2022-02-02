export default ({ schedule, typeCode, defaultAddress, storeStreetAddress }) => {
	const { street, number } = defaultAddress || {};
	const isDelivery = typeCode === "delivery";
	return Boolean(schedule)
		? `${schedule.day} ${schedule.monthName.substr(0, 3)}, ${
				schedule.hour
		  }:${schedule.minute} ${schedule.meridiem}`
		: isDelivery
		? `${number} ${street}`
		: storeStreetAddress;
};

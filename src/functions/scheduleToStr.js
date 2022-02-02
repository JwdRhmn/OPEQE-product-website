import formattedDate from "./formattedDate";

export default schedule => {
	const {
		monthName,
		day,
		year,
		hour,
		minute,
		meridiem
	} = (schedule || {});

	if(monthName){
		return `${monthName.substr(0, 3)} ${day}, ${year} ${hour}:${minute} ${meridiem}`
	} else {
		const now = new Date();
		const {
			monthName,
			day,
			year,
			hour12: hour,
			minute,
			meridiem
		} = formattedDate(now);
		return `${monthName.substr(0, 3)} ${day}, ${year} ${hour}:${minute} ${meridiem}`

	}
}

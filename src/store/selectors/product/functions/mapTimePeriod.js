export default timePeriod => {
	const out = {
		base: 1,
		inDays: timePeriod
	};
	
	switch(timePeriod){
		case 7: {
			out.label = "week";
			break;
		}
		case 30: {
			out.label = "month";
			break;
		}
		default: {
			out.base = timePeriod;
			out.label = "day";
			break;
		}
	}

	return out;
}
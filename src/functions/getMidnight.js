export default date => {
	let midnight;
	if(date){
		midnight = new Date(date.getTime());
	} else {
		midnight = new Date();
	}

	midnight.setHours(23);
	midnight.setMinutes(59);
	midnight.setSeconds(59);

	return midnight;
}
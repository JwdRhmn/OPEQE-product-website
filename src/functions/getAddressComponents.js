export default addressComponents => {

	const extracted = {
		number: '',
		street: '',
		city: '',
		state: '',
		zipCode: '',
		stateCode: '',
		country: '',
		countryCode: '',
		locationName: '',
	}

	let locality = '';

	addressComponents.forEach( component => {
		const { types, long_name, short_name } = component;
		if(types.includes('street_number')){
			extracted.number = long_name;
		} else if(types.includes('administrative_area_level_1')){
			extracted.state = long_name;
			extracted.stateCode = short_name;
		} else if(types.includes('administrative_area_level_2')){
			extracted.city = long_name;
		} else if(types.includes('country')){
			extracted.country = long_name;
			extracted.countryCode = short_name;
		} else if(types.includes('postal_code')){
			extracted.zipCode = long_name;
		} else if(types.includes('route')){
			extracted.street = long_name;
		} else if(types.includes('locality')){
			locality = long_name;
		}
	});

	extracted.locationName = `${extracted.number} ${locality}`;

	return extracted;
}
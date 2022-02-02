export default options => {
	const newOptions = options.map( ({
		id,
		title,
		description,
		isRequired,
		option,
		requirement,
		limit,
	}) => {
		const sides = option.map(({
			id: sideId,
            title: sideTitle,            
            description: sideDescription,
            price: sidePrice,
            calorie: sideCalorie,
            symbole,
            priority,
            unit,
            isDefault,
            inStock,
            image
		}) => ({
			key: sideId,
			title: sideTitle,
			fullTitle: `${sideTitle} ${symbole}`,
			description: sideDescription,
			price: sidePrice,
			priority,
			symbole,
			unit,
			isDefault,
			inStock,
			image
		})).sort(
			(next, prev) => (next.priority >= prev.priority) ? 1 : -1
		);

		


		let type;
		let min;
		let max;
		if(limit === 1){
			type = 'radio';
		} else {
			type = 'check';
			if(limit === requirement){
				max = limit;
				min = limit;
			} else {
				max = limit;
				min = requirement;
			}
		}

		return {
			id,
			type,
			max,
			min,
			options: sides,
			isRequired,
			title,
			description
		}
	});


	return newOptions;
}

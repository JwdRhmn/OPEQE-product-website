export default (color, alpha) => {
	const trimedColor = color.trim();

	let out = '';

	// dont change the condition orders
	if(trimedColor.substr(0, 4) === 'rgba'){
		out = trimedColor.replace(/,[^,]+\)/gi, `, ${alpha})`);
	} else if (trimedColor.substr(0, 3) === 'rgb'){
		out = trimedColor.replace(/\)/gi, `, ${alpha})`).replace('rgb', 'rgba');
	} else {

	}

	return out;
}
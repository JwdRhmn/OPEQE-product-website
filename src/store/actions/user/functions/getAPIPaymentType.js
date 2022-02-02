export default type => {
	const typeLower = type.toLowerCase();
	if(typeLower.includes('Express')){
		return 'American Express';
	} else if(typeLower.includes('visa')){
		return 'Visa';
	} else if(typeLower.includes('master')){
		return 'Mastercard';
	} else if(typeLower.includes('discover')){
		return 'Discover';
	} 
}

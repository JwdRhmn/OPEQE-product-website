export default type => {
	if(!type){
		return null;
	}

	const typeLower = type.toLowerCase();
	if(typeLower.includes('american')){
		return 'american-express';
	} else if(typeLower.includes('visa')){
		return 'visa';
	} else if(typeLower.includes('master')){
		return 'mastercard';
	} else if(typeLower.includes('discover')){
		return 'discover';
	}

}

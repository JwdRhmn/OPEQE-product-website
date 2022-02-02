export default (number, seperator=",") => {
	if(!number){
		return '';
	}

	let newNumber = number.toString();
	
	const mod3 = newNumber.length % 3;
	
	const non3 = newNumber.substr(0, mod3);

	newNumber = newNumber.substr(mod3);
	newNumber = newNumber.match(/.{1,3}/gi);
	newNumber = newNumber.join(seperator);
	
	return (non3 ? non3 + seperator : '') + newNumber;
}
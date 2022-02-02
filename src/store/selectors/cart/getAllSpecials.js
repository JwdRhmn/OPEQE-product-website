import getItemsTotalsById from "./getItemsTotalsById";
import getSpecial from "./getSpecial";

export default items => {	
	const itemsTotal = getItemsTotalsById(items);
	let specials = [];
	itemsTotal.forEach( item => { 
		if(item.special.title){
			const special = getSpecial(item);
			if(special){			
				specials.push(special);
			}
		}
	});
	return specials;
}
import indexOfObj from "../../../functions/indexOfObj";

export default items => {
	let newItems = [];
	items.forEach( item => {
		const index = indexOfObj(newItems, 
			{id: item.id}
		);
		let newItem = {};
		if(index === -1){
			newItem = {
				id: item.id,
				quantity: item.quantity,
				price: item.price,
				special: item.special,
			};
			newItems.push(newItem);
		} else {
			newItems[index].quantity += item.quantity;
		}
	});
	return newItems;
}
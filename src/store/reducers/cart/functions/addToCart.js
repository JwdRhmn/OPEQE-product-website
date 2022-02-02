import produce from 'immer';

import  uuid from "../../../../functions/uuid";

export default produce( (state, data) => {	
	if(!state.id){
		state.id = uuid();
		state.date = Date.now();
	}	
	state.rewards = data.rewards;
	state.delivery = {
		time: data.deliveryTime,
		fee: data.fee
	};
	state.items.push(data);
	delete state.items[state.items.length - 1].rewards;//?
	delete state.items[state.items.length - 1].fee;//?
	delete state.items[state.items.length - 1].deliveryTime;//?
});


// orderCondition
// delivery

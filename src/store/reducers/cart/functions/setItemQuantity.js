import produce from 'immer';

export default produce( (state, payload) => {
	const index = state.items.findIndex(item => item.key === payload.key);
	if(index !== -1){
		state.items[index].quantity = payload.quantity;
	}

	return state;
});


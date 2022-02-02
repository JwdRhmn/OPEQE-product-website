import produce from 'immer';

export default produce( (state, key) => {
	state.items = state.items.filter( item => {
        if(item.key === key){
            return false;
        }
        return true;
    });
});


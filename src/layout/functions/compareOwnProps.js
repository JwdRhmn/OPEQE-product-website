export default (exact, exclude=[], include) => (prev, next) => {
	if(include){
		for(let i = 0; i < include.length; i++){
			if(!includesExact(exact, exclude, include[i]) && prev[include[i]] !== next[include[i]]){
				return false;
			}
		}
	} else {
		for(const key in prev){
			if(!includesExact(exact, exclude, key) && prev[key] !== next[key]){
				return false;
			}
		}
	}

	return true;
}


const includesExact = (exact, array, target) => {
	if(exact){
		return array.includes(target);
	}
	
	for(let i = 0; i < array.length; i++){
		if(target.includes(array[i])){
			return true;
		}
	}
	return false;
}
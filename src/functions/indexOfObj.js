export default (array, props) => {
	let matches;
	for(let i = 0; i < array.length; i++){
		matches = true;
		for(const key in props){			
			if(array[i][key] !== props[key]){
				matches = false;
			}
		}
		if(matches){
			return i;
		}
	}
	return -1;
}
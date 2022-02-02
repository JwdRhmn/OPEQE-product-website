export default (value, count=2, where) => {
	const stringifiedValue = value.toString();
    const diff = count - stringifiedValue.length;

    if(diff > 0){
        if(where === 'after'){
        	return `${stringifiedValue}${'0'.repeat(diff)}`;
        } else {
        	return `${'0'.repeat(diff)}${stringifiedValue}`;
        }
    }

    return stringifiedValue;
}
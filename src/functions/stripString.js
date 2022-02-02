export default (
	str, 
	keep=[
		'A-Z', 
		'a-z', 
		'0-9'
	]
) => {
	let regex = new RegExp(`[^${keep.join('')}]`, 'gi');
	return str.replace(regex, '');
}
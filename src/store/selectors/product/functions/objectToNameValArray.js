const convert = (obj, transformer, iterate) => Object.keys(obj).map(key => ({
	name: key,
	value: transformer ? transformer(obj[key]) : obj[key],
	...(iterate && iterate)
}));


export default convert;
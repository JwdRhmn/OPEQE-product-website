export default (array, prop) => {
	return array.reduce(
		(total, item) => (total + item[prop] ? item[prop] : 0)
	, 0)
}
export default specials => {
	return specials.reduce( (total, special) => {
		return total + special.amount;
	}, 0)
}
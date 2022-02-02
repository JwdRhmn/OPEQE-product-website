import { createSelector } from "reselect";

export default createSelector(
	[
		state => state.product.favoriteItems.data
	],
	ids => {
		const out = [];
		for (const key in ids) {
			out.push(key);
		}

		return out;
	}
);

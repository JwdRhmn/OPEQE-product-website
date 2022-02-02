import produce from "immer";

import themeReducer from "./themeReducer";
import mobileHeaderReducer from "./mobileHeaderReducer";

const initialState = {};

export default (state = initialState, action) => {
	const { theme, mobileHeader } = state;

	const themeReduced = themeReducer(theme, action);
	const mobileHeaderReduced = mobileHeaderReducer(mobileHeader, action);

	return produce(state, finalState => {
		finalState.theme = themeReduced;
		finalState.mobileHeader = mobileHeaderReduced;
	});
};

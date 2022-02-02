import { createSelector } from "reselect";

export default createSelector(
	[state => state.theme],
	theme => transform(theme)
);

const transform = theme => theme;

import { createSelector } from "reselect";

export default createSelector(
	[state => state.mobileHeader],
	mobileHeader => transform(mobileHeader)
);

const transform = mobileHeader => mobileHeader;

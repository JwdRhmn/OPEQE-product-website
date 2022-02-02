import { useContext } from 'react';
import { __RouterContext, matchPath } from "react-router-dom";

export default () => {
	return {
		...useContext(__RouterContext),
		matchPath,
	}
}
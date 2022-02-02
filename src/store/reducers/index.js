import { combineReducers } from "redux";

import { reducer as offline } from "../redux-pwa";
import user from "./user";
import product from "./product";
import calendar from "./calendar";
import cart from "./cart";
import reserve from "./reserve";
import demo from "./demo";
import notification from "./notification";

export default combineReducers({
	offline,
	user,
	demo,
	product,
	cart,
	calendar,
	reserve,
	notification
});

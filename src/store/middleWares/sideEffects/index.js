import user from "./user";
import start from "./start";

export default store => next => action => {	
	next(action);
  	user(store, action);
  	start(store, action);
}

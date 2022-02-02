import { applyMiddleware, compose } from "redux"
import logger from "redux-logger"
import thunk from "redux-thunk"

import promiseMiddleware from "../store/middleWares/promise";
import reducers from "./reducers"
import sideEffects from "./middleWares/sideEffects";
import createOfflineStore from "./redux-pwa";



const middleware = applyMiddleware(
	promiseMiddleware,
	thunk, 
	sideEffects,
	//logger,
)


export default createOfflineStore(
	reducers, 
	compose(
    	middleware,
    	window.devToolsExtension ? window.devToolsExtension() : f => f,
  	)
);
import localForage from "localforage";

import { STORE_DB_CONFIG } from '../config/';

export function saveStore(currentState){
	localForage.config(STORE_DB_CONFIG);

	localForage.setItem('store', currentState).then(value => {
	  // console.log(value);
	}).catch(function (err) {
	  console.error(err);
	});
}


export async function loadStore(version, callBack){
	localForage.config(STORE_DB_CONFIG);

	try{
		const storeVersion = await localForage.getItem('version');

		if( (!storeVersion && storeVersion !== 0) || version > storeVersion ){
			localForage.setItem('version', version);
  			callBack({});
  			return;
  		}

		const store = await localForage.getItem('store');

  		if(store.offline){
  			store.offline.pending = {};
  		}
  		
  		callBack(store);	  		

	} catch (err) {
		callBack({});
	  	console.error(err);
	}
}
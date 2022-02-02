import handleOutgoing from "../handleQueue/handleOutgoing";
import handleDelayed from "../handleQueue/handleDelayed";
import { saveStore } from "../persist/";
import setNeedsCheck from "../actions/setNeedsCheck";
import { AUTO_RETRY_INTERVAL } from "../config/";

export default store => {
	store.subscribe(() => {
		const entireStore = store.getState();

		const {
			pending,
			ready,
			needsCheck,
			online,
			delayed,
		} = entireStore.offline;

		saveStore(entireStore);
		
		if(needsCheck){
			if(window.offlineFirstTimer){
				clearTimeout(window.offlineFirstTimer);
			}
			if(online){
				window.offlineFirstTimer = setTimeout(() => {
					store.dispatch(setNeedsCheck(true));
				}, AUTO_RETRY_INTERVAL);
			}

			store.dispatch(setNeedsCheck(false));
			handleOutgoing({
				ready,
				pending,
				dispatch: store.dispatch,
			});

			handleDelayed({
				delayed,
				dispatch: store.dispatch,
			});
		}

	});
}
import init from "./init";
import FCM, { refreshToken as refreshFCMToken } from "./FCM";

import * as FCMServiceWorker from "./FCM/service-worker";

export default store => {
	const initializedFirebase = init();
	FCM(store);
}


export {
	FCMServiceWorker,
	refreshFCMToken,
}
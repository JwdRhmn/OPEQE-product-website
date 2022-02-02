import { SET_STATUS_ON, SET_STATUS_OFF } from "../config";
import getStatus from "../getStatus/";

export default () => {
	const isOn = getStatus();

	if(isOn){
		return {
			type: SET_STATUS_ON,
		}
	} else {
		return {
			type: SET_STATUS_OFF,
		}
	}
}
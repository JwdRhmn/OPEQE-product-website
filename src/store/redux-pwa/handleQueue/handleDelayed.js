import checkDelayed from "../funtions/checkDelayed";
import addToReady from "../actions/addToReady";
import removeFromDelayed from "../actions/removeFromDelayed";

export default  ({
	delayed, 
	dispatch
}) => {
	checkDelayed(delayed, 'timeout', delayedData => {
		dispatch( removeFromDelayed(delayedData.key) );
		dispatch( addToReady(delayedData.data) );
	});
}



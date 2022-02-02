import setStatus from "../actions/setStatus";
import appStarted from "../actions/appStarted";
import appClosed from "../actions/appClosed";

export default dispatch => {
    if (typeof window !== 'undefined' && window.addEventListener) {
        window.addEventListener('online', () => dispatch(setStatus()));
        window.addEventListener('offline', () => dispatch(setStatus()));
    }    
    dispatch(setStatus());


    dispatch( appStarted() );
    window.addEventListener('beforeunload', () => dispatch( appClosed() ));
}
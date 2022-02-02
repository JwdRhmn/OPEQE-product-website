export default  (delayed, event, callBack) => {
	const now = Date.now();
	for(const key in delayed){
		const {
			timeout,
			onEnter,
			onExit,
			stamp,
		} = delayed[key];

		if(timeout && (stamp + timeout) <= now){
			callBack && callBack(delayed[key], 'timeout');
		}

		if(event === "enter" && onEnter){
			callBack && callBack(delayed[key], event);
		}

		if(event === "exit" && onExit){
			callBack && callBack(delayed[key], event);
		}
	}
}



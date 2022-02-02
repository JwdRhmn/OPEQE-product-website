import produce from "immer";

export default special => {
	const { beginTime, remainingTime, color } = special;

	let relativeRemainingTime;
	if (remainingTime) {
		const beginTimeSplitted = beginTime.split(":");
		let beginTimeStamp = new Date();
		beginTimeStamp.setHours(parseInt(beginTimeSplitted[0]));
		beginTimeStamp.setMinutes(parseInt(beginTimeSplitted[1]));
		beginTimeStamp.setSeconds(parseInt(beginTimeSplitted[2]));
		beginTimeStamp = beginTimeStamp.getTime();
		relativeRemainingTime =
			remainingTime * 60 - parseInt((Date.now() - beginTimeStamp) / 1000);
		relativeRemainingTime =
			(relativeRemainingTime > 0) ? relativeRemainingTime : 0;
	}
	if (remainingTime && !relativeRemainingTime) {
		return emptySpecial;
	}

	return produce(special, draft => {
		draft.title = draft.title.trim().replace(/^use /i, "");
		draft.remainingTime = relativeRemainingTime;
		draft.color = `rgb(${color})`;
		draft.type = (remainingTime > 0) ? "HappyHour" : "Special";

	});
};

const emptySpecial = {};

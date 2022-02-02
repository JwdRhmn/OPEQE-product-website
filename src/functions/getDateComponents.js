
export default (date, system, weekDays, monthNames) => {
	let base;

	switch(system){
		case 'GR': {
			base = {
				fullYear: date.getFullYear(),
				month: date.getMonth(),
				weekDayIndex: date.getDay(),
				day: date.getDate(),
			}
			break;
		}
		case 'JA': {
			base = {
				fullYear: date.jYear(),
				month: date.jMonth(),
				weekDayIndex: date.day(),
				day: date.jDate(),
			}
			break;
		}
		case 'HI': {
			base = {
				fullYear: date.iYear(),
				month: date.iMonth(),
				weekDayIndex: date.day(),
				day: date.iDate(),
			}
			break;
		}
		default: {
			throw new Error(`'system' is not valid`);
			break;
		}
	}

	const day = base.weekDayIndex;
	const month = base.month;

	base.monthName = monthNames[month];
	base.weekDay = weekDays[day];

	return base;
}


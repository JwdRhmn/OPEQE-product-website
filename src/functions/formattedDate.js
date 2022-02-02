import { MONTH_NAMES, WEEK_DAYS } from "./config/texts";

export default date => {
	let now;
	if(date) {
		now = date;
	} else {
		now = new Date()
	}

	let day = now.getDate();
	let weekDay = now.getDay()
	let month = now.getMonth()+1; 
	let year = now.getFullYear();
	let hour = now.getHours();
	let minute = now.getMinutes();
	let second = now.getSeconds();
	let hour12 = hour;
	let meridiem;
	if(hour12 >= 12){
		meridiem = 'PM';
	} else {
		meridiem = 'AM';
	}
	
	if(hour12 > 12){
		hour12 -= 12;
	}


	hour12 = addZero(hour12);
	hour = addZero(hour);
	minute = addZero(minute);
	second = addZero(second);
	month = addZero(month);
	day = addZero(day);

	return {
		hour12,
		hour,
		minute,
		second,
		year,
		month,
		monthName: MONTH_NAMES[parseInt(month) - 1],
		weekDay: WEEK_DAYS[weekDay],
		weekDayIndex: weekDay,
		meridiem,
		day,
	};
}

const addZero = value => {
	if(value < 10){
		value = '0' + value.toString();
	}
	return value;
}
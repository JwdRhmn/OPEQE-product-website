export default ({
	monthName,
	day,
	year,
	hour12,
	minute,
	meridiem
}) => {


  return `${monthName} ${day}, ${year} ${hour12}:${minute} ${meridiem}`;
}
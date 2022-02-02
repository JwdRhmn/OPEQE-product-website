export default (str, start, end, skip=" ", mask="*") => {
	const length = str.length;
	const realStart = start >= 0 ? start : (length + start);
	const realEnd = end >= 0 ? end : (length + end + 1);

	let out = "";
	for(let i = 0; i < length; i++){
		if((i < realStart || i > realEnd) && str[i] !== skip){
			out += "*";
			continue;
		}
		out += str[i];
	}

	return out;
}
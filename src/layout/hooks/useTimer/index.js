import { useState, useEffect } from "react";

export default function({ 
	from=0, 
	to=0, 
	step=-1, 
	interval=1000, 
	onChange, 
	onEnd 
}){

	const initialState = {
		seconds: from,
		running: true,
	}
	const [ 
		state, 
		setState,
	] = useState(initialState);

	useEffect(() => {
		const { seconds, running } = state;

		if(!running && seconds === to){
			return;
		}
		const intervalPointer = setInterval(() => {
			if(seconds === to){
				clearInterval(intervalPointer);
				setState({
					...state,
					running: false,
				});
				if(onEnd){
					onEnd(seconds);
				}
				return;
			}
			setState({
				...state,
				seconds: seconds + step,
			});
			if(onChange){
				onChange(seconds + step);
			}
		}, interval);
		return () => clearInterval(intervalPointer);
	});


	function getFormatted(seconds, format={}){
		const {
			days: includeDays = true,
			hours: includeHours = true,
			minutes: includeMinutes = true,
		} = format;
		const lengthInSeconds = {
			day: 60 * 60 * 24,
			hour: 60 * 60,
			minute: 60,
		};

		
		let days = null;	
		if(includeDays){			
			days = parseInt(seconds / (lengthInSeconds.day));
			seconds %= lengthInSeconds.day;
		}
		
		let hours = null;			
		if(includeHours){			
			hours = parseInt(seconds / (lengthInSeconds.hour));
			seconds %= lengthInSeconds.hour;
		}
		
		let minutes = null;			
		if(includeMinutes){			
			minutes = parseInt(seconds / (lengthInSeconds.minute));
			seconds %= lengthInSeconds.minute;
		}

		return {
			days,
			hours,
			minutes,
			seconds,
		}
	}

	return {
		seconds: state.seconds,
		getFormatted,
	};
}
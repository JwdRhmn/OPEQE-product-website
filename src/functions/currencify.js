import { CURRENCY_SYMBOL } from "./config/texts";
import round from "./round";


export default (price, signed) => {
	if(price === 0){
		return `${CURRENCY_SYMBOL}${round(0, 2, true)}`;
	}

	if(price > 0){
		return !signed ? ( 
			`${CURRENCY_SYMBOL}${round(price, 2, true)}` 
		) : ( 
			`+${CURRENCY_SYMBOL}${round(price,  2, true)}`
		);
	}

	if(price < 0){
		return `-${CURRENCY_SYMBOL}${round(Math.abs(price), 2, true)}`;
	}
}

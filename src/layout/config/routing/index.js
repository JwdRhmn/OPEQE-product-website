import stripString from "../../../functions/stripString";


export const HOME_PAGE_URL = () => "";

export const SIGN_UP_PAGE_URL = () => "login";
export const LOG_IN_PAGE_URL = () => "login";

export const PRODUCT_PAGE_URL = ({
	category,
    type,
    manufacturer,
	id
} = {}) => {
	if (!id) {
		return "products/:category/:type/:manufacturer/:id";
	}

	return `products/${
		stripString(category.toLowerCase())
	}/${
		stripString(type.toLowerCase())
	}/${
		stripString(manufacturer.toLowerCase())
	}/${
		id
	}`;
};



export const SHOPPING_CART_PAGE_URL = () => "cart";
export const ORDER_HISTORY_PAGE_URL = () => "order-history";
export const ORDER_HISTORY_RECENT_PAGE_URL = () => ORDER_HISTORY_PAGE_URL() + "/recent";

export const ITEM_SEARCH_PAGE_URL = ({ filterTypes, filterValue } = {}) => {
	let params = "";
	if (filterValue) {
		params += `&filterValue=${filterValue}`;
	}
	if (filterTypes) {
		const types = filterTypes.reduce((total, type, index) => {
			return total + `${index > 0 ? "&" : ""}filterTypes[]=${type}`;
		}, "");

		params += `&${types}`;
	}

	return `search${params ? "?" + params.substr(1) : ""}`;
};

export const ORDER_OPTIONS_PAGE_URL = () => "order-options";

export const RESERVATION_LIST_PAGE_URL = () => "reservation";
export const RESERVATION_OPTIONS_PAGE_URL = () =>
	`${RESERVATION_LIST_PAGE_URL()}/new`;
export const RESERVATION_DETAILS_PAGE_URL = ({ isWait } = {}) => {
	let out = `${RESERVATION_OPTIONS_PAGE_URL()}/details`;
	if (isWait) {
		out += "?type=waitlist";
	}
	return out;
};

export const PROFILE_PAGE_URL = () => "profile";
export const PROFILE_PAYMENT_LIST_PAGE_URL = () =>
	PROFILE_PAGE_URL() + "/payment";
export const PROFILE_PROMO_PAGE_URL = () =>
	PROFILE_PAGE_URL() + "/promo";
export const PROFILE_INVITE_PAGE_URL = () =>
	PROFILE_PAGE_URL() + "/invite";


export const BANNED_PAGE_URL = () => "banned";
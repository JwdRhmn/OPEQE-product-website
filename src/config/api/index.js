export const domain = "https://okays.io/api/";

export const checkIfEmailIsDemoURl = domain + "auth/demo";

export const checkIfNewUserURL = domain + "auth/login/duplicate";
export const checkDuplicateCodeURL = domain + "web/auth/confirmation"
export const userLoginURL = domain + "auth/login";
export const userSignUpURL = domain + "auth/register";
export const fetchUserPaymentMethodsURL = domain + "app/profile/payments";
export const addUserPaymentMethodURL = domain + "app/profile/payment";
export const editUserPaymentMethodURL = domain + "app/profile/payment/edit";
export const fetchUserRewardsURL = domain + "app/rewards";
export const editUserNameURL = domain + "app/profile/name";
export const editUserPasswordURL = domain + "app/profile/password";
export const editUserEmailURL = domain + "app/profile/email";
export const verifyUserEmailURL = domain + "app/profile/email/verify";
export const fetchUserReferralURL = domain + "v-one/app/referral";

export const getUserAddressURL = domain + "app/user/address";
export const setUserAddressURL = domain + "user/address";

export const getProductURL = domain + "v-one/app/listproduct";
export const getProductOptionsURL = domain + "v-one/app/product/option";
export const getProductByIdURL = domain + "v-one/web/product/option";
export const addToFavoriteURL = domain + "app/profile/favorite"; 
export const removeFromFavoriteURL = domain + "app/profile/favorite/delete"; 

export const submitShoppingCartURL = domain + 'app/order';
export const fetchOrderHistoryURL = domain + "app/order/history";
export const cancelOrderURL = domain + "app/order/delete";

export const googleMapsAPIKey = "AIzaSyAL4TYcScp8aUIeeOwJsWfjA84FO7QUSxo";
export const mapsAPIDomain = 'https://maps.googleapis.com/maps/api/';
export const getDistanceURL= mapsAPIDomain + 'distancematrix/json?key=' + googleMapsAPIKey;

export const getCalendarEventsURL = domain + "app/reserve/event";

export const addReserveURL = domain + "app/reserve";
export const checkReserveAvailabilityURL = domain + "app/reserve/validation";
export const getReserveHistoryURL = domain + "app/reserve/history";
export const canselReserveURL = domain + "app/reserve/delete";